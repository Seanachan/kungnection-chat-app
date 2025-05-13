import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Hash,
  Code,
  Settings,
  Cat,
  Mic,
} from "lucide-react";
import { Channel } from "../types";
import styles from "./css/Sidebar.module.css";
interface SidebarProps {
  activeChannel: string;
  setActiveChannel: (id: string) => void;
}
const Sidebar = ({ activeChannel, setActiveChannel }: SidebarProps) => {
  const [showTextChannels, setShowTextChannels] = useState(true);
  const [showVoiceChannels, setShowVoiceChannels] = useState(true);

  const textChannels: Channel[] = [
    { id: "General", name: "General", icon: <Hash size={20} /> },
    { id: "Game", name: "Game", icon: <Cat size={20} /> },
    { id: "Music", name: "Music", icon: <Hash size={20} /> },
    { id: "JavaScript", name: "JavaScript", icon: <Code size={20} /> },
  ];

  const voiceChannels: Channel[] = [
    { id: "voice-general", name: "Voice General", icon: <Mic size={20} /> },
    { id: "voice-coding", name: "Voice Coding", icon: <Mic size={20} /> },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.title}>CodeChat</h1>
      </div>

      <div className={styles.channelSection}>
        <div
          className={styles.channelHeader}
          onClick={() => setShowTextChannels(!showTextChannels)}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>TEXT CHANNELS</span>
          {showTextChannels ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </div>
        {showTextChannels && (
          <ul className={styles.channelList}>
            {textChannels.map((channel) => (
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

      <div className={styles.channelSection}>
        <div
          className={styles.channelHeader}
          onClick={() => setShowVoiceChannels(!showVoiceChannels)}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>VOICE CHANNELS</span>
          {showVoiceChannels ? (
            <ChevronDown size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </div>

        {showVoiceChannels && (
          <ul className={styles.channelList}>
            {voiceChannels.map((channel) => (
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

      <div className={styles.footer}>
        <button className={styles.settingsButton}>
          <Settings size={20} />
          <span className={styles.settingsText}>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
