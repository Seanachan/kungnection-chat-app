import styles from "../css/Sidebar.module.css";
import React, { useState } from "react";
import { Plus, UserPlus, Mic, ChevronDown, ChevronRight } from "lucide-react";
import Modal from "./Modal";
import CreateChannelForm from "./CreateChannelForm";
import JoinChannelForm from "./JoinChannelForm";

interface VoiceChannelProps {
  activeChannel?: { code: string; name: string };
  setActiveChannel: (code: string, name: string) => void;
  channels: { name: string; code: string }[];
}

const VoiceChannel: React.FC<VoiceChannelProps> = ({
  activeChannel,
  setActiveChannel,
  channels,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
            {channels.map((channel) => (
              <li key={channel.code}>
                <button
                  className={`${styles.channelButton} ${
                    activeChannel?.code === channel.code ? styles.active : ""
                  }`}
                  onClick={() => setActiveChannel(channel.code, channel.name)}
                >
                  <span className={styles.channelIcon}>
                    <Mic size={20} />
                  </span>
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
        title="Join a Voice Channel"
      >
        <JoinChannelForm
          onCancel={() => setIsJoinModalOpen(false)}
          type="voice"
        />
      </Modal>

      {/* Create Channel Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create a Voice Channel"
      >
        <CreateChannelForm
          onCancel={() => setIsCreateModalOpen(false)}
          type="Voice"
        />
      </Modal>
    </>
  );
};

export default VoiceChannel;
