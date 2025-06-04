import styles from "../css/Sidebar.module.css";
import React, { useState } from "react";
import {
  Hash,
  Cat,
  Code,
  ChevronDown,
  ChevronRight,
  Plus,
  UserPlus,
} from "lucide-react";
import Modal from "./Modal";
import JoinChannelForm from "./JoinChannelForm";
import CreateChannelForm from "./CreateChannelForm";

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
        {/* Header for the text channels section */}
        <div
          className={styles.channelHeaderContainer}
          style={{ cursor: "pointer" }}
        >
          <h2 className={styles.channelHeader}>TEXT CHANNELS</h2>
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

export default TextChannels;
