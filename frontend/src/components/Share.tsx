import React, { useState } from "react";
import { Share as ShareIcon } from "lucide-react";
import Modal from "./Modal";
import ShareForm from "./ShareForm";
import styles from "../css/Sidebar.module.css";
interface ShareProps {
  activeChannel: { code: string; name: string };
}
const Share: React.FC<ShareProps> = ({ activeChannel }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  return (
    <>
      <div>
        <button
          className={styles.ShareButton}
          onClick={() => setIsShareOpen(!isShareOpen)}
        >
          <ShareIcon size={20} />
          <span className={styles.ShareText}>Share</span>
        </button>
      </div>

      {/* Share */}
      <Modal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title="Share"
      >
        <ShareForm
            activeChannel={activeChannel}
        />
      </Modal>
    </>
  );
};

export default Share;
