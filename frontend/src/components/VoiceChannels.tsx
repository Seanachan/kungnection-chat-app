import styles from "../css/Sidebar.module.css";
import React, { useState } from "react";
import { Plus, UserPlus, Mic, ChevronDown, ChevronRight } from "lucide-react";
import Modal from "./Modal";
import CreateChannelForm from "./CreateChannelForm";
import JoinChannelForm from "./JoinChannelForm";

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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleCreateChannel = (code: string) => {
    console.log(code);
  };
  const handleJoinChannel = (code: string) => {
    // In a real app, this would fetch channel details from the backend
    // For demo purposes, we'll create a new channel based on the code

    // Check if it's a voice channel code (starts with "voice-")
    if (code.startsWith("voice-")) {
      // const channelName = code.replace("voice-", "");
      // const newChannel = {
      //   id: code,
      //   name: channelName,
      //   icon: <Mic size={20} />,
      // };
    } else if (code.startsWith("text-")) {
      // const channelName = code.replace("voice-", "");
      // const newChannel = {
      //   id: code,
      //   name: channelName,
      //   icon: <Hash size={20} />,
      // };
    }

    // Close the modal
  };
  return (
    <>
      <div className={styles.channelSection}>
        <div
          className={styles.channelHeaderContainer}
          style={{ cursor: "pointer" }}
        >
          <h2 className={styles.channelHeader}>VOICE CHANNELS</h2>
          <button
            className={styles.addFriendButton}
            title="Join Channel"
            onClick={() => setIsJoinModalOpen(true)}
          >
            <UserPlus size={20} />
          </button>

          <button
            className={styles.addFriendButton}
            title="Create Channel"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={20} />
          </button>
          {isCollapsed ? (
            <ChevronRight
              size={16}
              className={styles.channelHeaderIcon}
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          ) : (
            <ChevronDown
              size={16}
              className={styles.channelHeaderIcon}
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          )}
        </div>
        {!isCollapsed && (
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

      {/* Join Channel Modal */}
      <Modal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        title="Join a Channel"
      >
        <JoinChannelForm
          onJoin={handleJoinChannel}
          onCancel={() => setIsJoinModalOpen(false)}
        />
      </Modal>

      {/* Create Channel Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create a Channel"
      >
        <CreateChannelForm
          onCreate={handleCreateChannel}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default VoiceChannel;
