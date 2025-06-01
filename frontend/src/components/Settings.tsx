import React, { useState } from "react";
import { Share } from "lucide-react";
import Modal from "./Modal";
import SettingsForm from "./SettingsForm";
import styles from "../css/Sidebar.module.css";
interface SettingsProps {
  activeChannel: string;
}
const Settings: React.FC<SettingsProps> = ({ activeChannel }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <>
      <div className={styles.sidebarBottom}>
        <button
          className={styles.settingsButton}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <Share size={20} />
          <span className={styles.settingsText}>Share</span>
        </button>
      </div>

      {/* Settings */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Share"
      >
        <SettingsForm activeChannel={activeChannel} />
      </Modal>
    </>
  );
};

export default Settings;
