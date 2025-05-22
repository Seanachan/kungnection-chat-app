import styles from "../css/Sidebar.module.css";
import React, { useState } from "react";
import { UserRound, ChevronDown, ChevronRight } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface personalChannelProps {
  activeChannel?: string;
  setActiveChannel: (id: string) => void;
}

export const personalChannels: Channel[] = [
  { id: "voice-general", name: "Tom", icon: <UserRound size={20} /> },
  { id: "voice-coding", name: "JKai", icon: <UserRound size={20} /> },
];
/**
 * Component for displaying voice channels in the sidebar
 *
 * The component shows a list of voice channels that users can join
 * Each channel has a name and an icon
 * Users can click on a channel to set it as active
 */
const personalChannel: React.FC<personalChannelProps> = ({
  activeChannel,
  setActiveChannel,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className={styles.channelSection}>
      <div
        className={styles.channelHeaderContainer}
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ cursor: "pointer" }}
      >
        <h2 className={styles.channelHeader}>PERSONAL CHANNELS</h2>
        {isCollapsed ? (
          <ChevronRight size={16} className={styles.channelHeaderIcon} />
        ) : (
          <ChevronDown size={16} className={styles.channelHeaderIcon} />
        )}
      </div>
      {!isCollapsed && (
        <ul className={styles.channelList}>
          {personalChannels.map((channel) => (
            <li key={channel.id}>
              <button
                className={`${styles.channelButton} ${
                  activeChannel === channel.id ? styles.active : ""
                }`}
                onClick={() => setActiveChannel(channel.id)}
              >
                <span className={styles.channelIcon}>{channel.icon}</span>
                <span>{channel.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default personalChannel;
