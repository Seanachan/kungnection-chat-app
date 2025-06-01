import { useState } from "react";
import { Clipboard } from "lucide-react";
import styles from "../css/Share.module.css";
interface settingsProp {
  activeChannel: string;
}
const SettingsForm: React.FC<settingsProp> = ({ activeChannel }) => {
  const shareChannel = (platform: string) => {
    const generateChannelCode = (channelId: string) => {
      // In a real app, this would generate a unique invite code from the backend
      // For demo purposes, we'll create a simple code
      //TO-DO: do real generated hash
      return `${channelId}-invite-${Math.random().toString(36).substr(2, 6)}`;
    };

    const channelCode = generateChannelCode(activeChannel);
    const shareText = `Join me in the ${activeChannel} channel on CodeChat! Use code: ${channelCode}`;
    const shareUrl = `https://kungnection.app/join/${channelCode}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            shareText + " " + shareUrl
          )}`,
          "_blank"
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        alert("Channel invite copied to clipboard!");
        break;
    }
  };
  return (
    <>
      <div className={styles.shareRow}>
        <button
          onClick={() => shareChannel("whatsapp")}
          className={`${styles.button} ${styles.whatsapp}`}
        >
          <span className="text-sm">WhatsApp</span>
        </button>

        <button
          onClick={() => shareChannel("telegram")}
          className={`${styles.button} ${styles.telegram}`}
        >
          <span className="text-sm">Telegram</span>
        </button>

        <button
          onClick={() => shareChannel("twitter")}
          className={`${styles.button} ${styles.twitter}`}
        >
          <span className="text-sm">Twitter</span>
        </button>

        <button
          onClick={() => shareChannel("facebook")}
          className={`${styles.button} ${styles.facebook}`}
        >
          <span className="text-sm">Facebook</span>
        </button>
      </div>

      <button
        onClick={() => shareChannel("copy")}
        className={`${styles.button} ${styles.copy}`}
      >
        <Clipboard size={20} />
        <span className="text-sm">Copy Invite Link</span>
      </button>
    </>
  );
};

export default SettingsForm;
