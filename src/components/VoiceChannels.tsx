import styles from "./css/Sidebar.module.css";
// import {socket, sendSignal} from "../webrtc/signaling"
import { Mic } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface VoiceChannelProps {
  activeChannel?: string;
  setActiveChannel: (id: string) => void;
}

export const voiceChannels: Channel[] = [
  { id: "voice-general", name: "Voice General", icon: <Mic size={20} /> },
  { id: "voice-coding", name: "Voice Coding", icon: <Mic size={20} /> },
];
/**
 * Component for displaying voice channels in the sidebar
 * 
 * The component shows a list of voice channels that users can join
 * Each channel has a name and an icon
 * Users can click on a channel to set it as active
 */
const VoiceChannel: React.FC<VoiceChannelProps> = ({
  activeChannel,
  setActiveChannel,
}) => {
  return (
    <div className={styles.channelSection}>
      <h2 className={styles.channelHeader}>VOICE CHANNELS</h2>
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
    </div>
  );
};

export default VoiceChannel;
