import { useState, useEffect } from "react";
import styles from "../css/Sidebar.module.css";
import TextChannels from "./TextChannels";
// import VoiceChannel from "./VoiceChannels";
import PersonalChannel from "./PersonalChannels";
import Settings from "./Settings";
import { BASE_URL } from "../config";
interface SidebarProps {
  activeChannel: { code: string; name: string; type: string };
  setActiveChannel: (activeChannel: {
    code: string;
    name: string;
    type: string;
  }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeChannel,
  setActiveChannel,
}) => {
  const [channels, setChannels] = useState<{ name: string; code: string }[]>(
    [],
  );
  const [friends, setFriends] = useState<{ id: number; name: string }[]>([]);

  const fetchSidebarData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found in localStorage");

      const response = await fetch(`${BASE_URL}/user/sidebar`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Sidebar fetch failed with status " + response.status);
      }

      const data = await response.json();
      setChannels(data.channels || []);
      setFriends(data.friends || []);
    } catch (error) {
      // Silently handle sidebar fetch errors
    }
  };

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const handleChannelChange = (code: string, name: string, type: string) => {
    setActiveChannel({ code, name, type });
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <PersonalChannel
          activeChannel={activeChannel.code}
          setActiveChannel={handleChannelChange}
          friends={friends}
          onChannelUpdate={fetchSidebarData}
        />
        <TextChannels
          activeChannel={{
            code: activeChannel.code,
            name: activeChannel.name,
            type: activeChannel.type,
          }}
          setActiveChannel={handleChannelChange}
          channels={channels}
          onChannelUpdate={fetchSidebarData}
        />
        {/* <VoiceChannel
          activeChannel={{
            code: activeChannel.code,
            name: activeChannel.name,
          }}
          setActiveChannel={handleChannelChange}
          channels={channels}
        /> */}
        <Settings
          activeChannel={{
            code: activeChannel.code,
            name: activeChannel.name,
          }}
          channels={channels}
        />
      </aside>
    </>
  );
};

export default Sidebar;
