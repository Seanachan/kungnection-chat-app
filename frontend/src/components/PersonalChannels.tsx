import styles from "../css/Sidebar.module.css";
import React, { useState } from "react";
import {
  UserRound,
  ChevronDown,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import Modal from "./Modal";
import AddFriendForm from "./AddFriendForm";

interface personalChannelProps {
  activeChannel?: string;
  setActiveChannel: (code: string, name:string, type:string) => void;
  friends: { id: number; name: string }[];
  onChannelUpdate: () => void;
}

const personalChannel: React.FC<personalChannelProps> = ({
  activeChannel,
  setActiveChannel,
  friends,
  onChannelUpdate
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  return (
    <>
      <div className={styles.channelSection}>
        <div
          className={styles.channelHeaderContainer}
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ cursor: "pointer" }}
        >
          <h2 className={styles.channelHeader}>PERSONAL CHANNELS</h2>
          <button
            className={styles.addFriendButton}
            title="Join Channel"
            onClick={() => setIsJoinModalOpen(true)}
          >
            <UserPlus size={20} />
          </button>

          {isCollapsed ? (
            <ChevronRight size={16} className={styles.channelHeaderIcon} />
          ) : (
            <ChevronDown size={16} className={styles.channelHeaderIcon} />
          )}
        </div>
        {!isCollapsed && (
          <ul className={styles.channelList}>
            {friends.map((friend) => (
              <li key={friend.id}>
                <button
                  className={`${styles.channelButton} ${
                    activeChannel === String(friend.id) ? styles.active : ""
                  }`}
                  onClick={() => setActiveChannel(String(friend.id), friend.name, "personal")}
                >
                  <span className={styles.channelIcon}>
                    <UserRound size={20} />
                  </span>
                  <span>{friend.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add a Friend Modal */}
      <Modal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        title="Join a Channel with Friend"
      >
        <AddFriendForm
          onCancel={() => setIsJoinModalOpen(false)}
          type="Friend"
          onSuccess={onChannelUpdate}
        />
      </Modal>

    </>
  );
};

export default personalChannel;
//Registered user: {"id":3,"username":"hsin","email":"kungfu@example.com","password":"2Jdiggxl","nickname":"hsin","channelMemberships":null,"friends":null}

