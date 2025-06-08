import styles from "../css/Sidebar.module.css";
import React, { useState } from "react";
import { Hash, ChevronDown, ChevronRight, Plus, UserPlus } from "lucide-react";
import Modal from "./Modal";
import JoinChannelForm from "./JoinChannelForm";
import CreateChannelForm from "./CreateChannelForm";

interface TextChannelsProps {
  activeChannel?: ({code: string, name:string});
  setActiveChannel: (code: string, name:string) => void;
  onChannelUpdate?: () => void;
  channels: { name: string; code: string }[];
}

const TextChannels: React.FC<TextChannelsProps> = ({
  activeChannel,
  setActiveChannel,
  channels,
  onChannelUpdate,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  if (!channels) {
    channels = [{ name: "General", code: "General" }];
  }

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
            {channels.map((channel) => (
              <li key={channel.code}>
                <button
                  // Apply active style when this channel is selected
                  className={`${styles.channelButton} ${
                    activeChannel?.code === channel.code ? styles.active : ""
                  }`}
                  onClick={() => setActiveChannel(channel.code, channel.name)}
                >
                  {/* Channel icon */}
                  <span className={styles.channelIcon}>
                    <Hash size={20} />
                  </span>
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
        title="Join a Text Channel"
      >
        <JoinChannelForm
          onCancel={() => setIsJoinModalOpen(false)}
          type="text"
          onSuccess={onChannelUpdate}
        />
      </Modal>

      {/* Create Channel Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create a Text Channel"
      >
        <CreateChannelForm
          onCancel={() => setIsCreateModalOpen(false)}
          type="Text"
          onSuccess={onChannelUpdate}
        />
      </Modal>
    </>
  );
};

export default TextChannels;
