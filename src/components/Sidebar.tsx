import { useState } from "react";
import styles from "./css/Sidebar.module.css";
import TextChannels from "./TextChannels";
import VoiceChannel from "./VoiceChannels";

interface SidebarProps {
  setActiveChannel: (channelId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveChannel }) => {
  const [activeChannel, setActiveChannelLocal] = useState("General");


  const handleChannelChange = (channelId: string) => {
    setActiveChannelLocal(channelId);
    setActiveChannel(channelId);
  };

  return (
    <aside className={styles.sidebar}>
      <TextChannels 
        activeChannel={activeChannel} 
        setActiveChannel={handleChannelChange} 
      />
      <VoiceChannel
        activeChannel={activeChannel}
        setActiveChannel={handleChannelChange}
      />
    </aside>
  );
};

export default Sidebar;
