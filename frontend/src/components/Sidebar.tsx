import { useState } from "react";
import styles from "../css/Sidebar.module.css";
import TextChannels from "./TextChannels";
import VoiceChannel from "./VoiceChannels";
import PersonalChannel from "./PersonalChannels";
import Settings from "./Settings";
// import Modal from "./Modal";

interface SidebarProps {
  activeChannel: string;
  setActiveChannel: (channelId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveChannel }) => {
  const [activeChannel, setActiveChannelLocal] = useState("General");

  const handleChannelChange = (channelId: string) => {
    setActiveChannelLocal(channelId);
    setActiveChannel(channelId);
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <PersonalChannel
          activeChannel={activeChannel}
          setActiveChannel={handleChannelChange}
        />
        <TextChannels
          activeChannel={activeChannel}
          setActiveChannel={handleChannelChange}
        />
        <VoiceChannel
          activeChannel={activeChannel}
          setActiveChannel={handleChannelChange}
        />
          <Settings activeChannel={activeChannel} />
      </aside>
    </>
  );
};

export default Sidebar;
