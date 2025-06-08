import React, { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import Modal from "./Modal";
import SettingsForm from "./SettingsForm";
import styles from "../css/Sidebar.module.css";
interface SettingsProps {
  activeChannel: ({code: string, name:string});
    channels: { name: string; code: string }[];
}
const Settings: React.FC<SettingsProps> = ({ activeChannel, channels }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <>
      <div className={styles.sidebarBottom}>
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={styles.ShareButton}
        >
          <SettingsIcon size={20} />
          <span className={styles.ShareText}>Settings</span>
        </button>
      </div>

      {/* Settings */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Settings"
      >
        <SettingsForm activeChannel={activeChannel} channels={channels} />
      </Modal>
    </>
  );
};

export default Settings;
