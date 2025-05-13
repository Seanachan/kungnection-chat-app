import styles from "./css/Sidebar.module.css";
import { Hash, Cat, Code } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface TextChannelsProps {
  activeChannel?: string;
  setActiveChannel: (id: string) => void;
}

export const textChannels: Channel[] = [
  { id: "General", name: "General", icon: <Hash size={20} /> },
  { id: "Game", name: "Game", icon: <Cat size={20} /> },
  { id: "Music", name: "Music", icon: <Hash size={20} /> },
  { id: "JavaScript", name: "JavaScript", icon: <Code size={20} /> },
];

/**
 * TextChannels component that displays a list of text channels
 * @param activeChannel - The currently selected channel ID
 * @param setActiveChannel - Function to update the active channel
 */
const TextChannels: React.FC<TextChannelsProps> = ({
  activeChannel,
  setActiveChannel,
}) => {
  return (
    <div className={styles.channelSection}>
      {/* Header for the text channels section */}
      <h2 className={styles.channelHeader}>TEXT CHANNELS</h2>
      <ul className={styles.channelList}>
        {/* Map through available channels and render each as a list item */}
        {textChannels.map((channel) => (
          <li key={channel.id}>
            <button
              // Apply active style when this channel is selected
              className={`${styles.channelButton} ${
                activeChannel === channel.id ? styles.active : ""
              }`}
              onClick={() => setActiveChannel(channel.id)}
            >
              {/* Channel icon */}
              <span className={styles.channelIcon}>{channel.icon}</span>
              {/* Channel name */}
              <span>{channel.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextChannels;
