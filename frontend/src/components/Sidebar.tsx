import { useState, useEffect } from "react";
import styles from "../css/Sidebar.module.css";
import TextChannels from "./TextChannels";
// import VoiceChannel from "./VoiceChannels";
import PersonalChannel from "./PersonalChannels";
import Settings from "./Settings";
// import Modal from "./Modal";

interface SidebarProps {
  activeChannel: { code: string; name: string };
  setActiveChannel: (activeChannel: { code: string; name: string }) => void;
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
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://localhost:8080/user/sidebar", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch sidebar data");
      return;
    }

    const data = await response.json();
    console.log(data.channels);
    console.log(data.friends);
    setChannels(data.channels || []);
    setFriends(data.friends || []);
  };

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const handleChannelChange = (code: string, name: string) => {
    setActiveChannel({ code, name });
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
