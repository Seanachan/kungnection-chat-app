import { useState } from "react";
import { Hash, Code, Settings } from 'lucide-react';
import { Channel } from "../types";
import styles from './css/Sidebar.module.css';

const Sidebar = () => {
  const [activeChannel, setActiveChannel] = useState<string>("general");

  const channels: Channel[] = [
    { id: "general", name: "General", icon: <Hash size={20} /> },
    { id: "javascript", name: "JavaScript", icon: <Code size={20} /> },
    { id: "python", name: "Python", icon: <Code size={20} /> },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.title}>CodeChat</h1>
      </div>

      <div className={styles.channelSection}>
        <h2 className={styles.channelHeader}>CHANNELS</h2>
        <ul className={styles.channelList}>
          {channels.map((channel) => (
            <li key={channel.id}>
              <button
                className={`${styles.channelButton} ${activeChannel === channel.id ? styles.active : ''}`}
                onClick={() => setActiveChannel(channel.id)}
              >
                <span className={styles.channelIcon}>{channel.icon}</span>
                <span>{channel.name}</span>
              </button>
            </li>
          ))}
        </ul>
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
