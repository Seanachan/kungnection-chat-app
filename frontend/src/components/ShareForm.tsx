import { Clipboard, Twitter } from "lucide-react";
import { siFacebook, siWhatsapp, siTelegram } from "simple-icons/icons";
import styles from "../css/Share.module.css";
interface settingsProp {
  activeChannel: { code: string; name: string };
}
const ShareForm: React.FC<settingsProp> = ({ activeChannel }) => {
  const shareChannel = (platform: string) => {
    const shareText = `Join me in the ${activeChannel} channel on Kungnection! Use code: ${activeChannel.code}`;
    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText,
          )}`,
          "_blank",
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
            shareText,
          )}`,
          "_blank",
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText)}`,
          "_blank",
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?text=${encodeURIComponent(shareText)}`,
          "_blank",
        );
        break;
      case "copy":
        navigator.clipboard.writeText(`${shareText}`);
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
          <span
            dangerouslySetInnerHTML={{ __html: siWhatsapp.svg }}
            style={{
              width: 20,
              height: 20,
              display: "inline-block",
              fill: "#FFFFFF",
            }}
          />
          <span className="text-sm">WhatsApp</span>
        </button>

        <button
          onClick={() => shareChannel("telegram")}
          className={`${styles.button} ${styles.telegram}`}
        >
          <span
            dangerouslySetInnerHTML={{ __html: siTelegram.svg }}
            style={{
              width: 20,
              height: 20,
              display: "inline-block",
              fill: "#FFFFFF",
            }}
          />
          <span className="text-sm">Telegram</span>
        </button>
      </div>

      <div className={styles.shareRow}>
        <button
          onClick={() => shareChannel("twitter")}
          className={`${styles.button} ${styles.twitter}`}
        >
          <Twitter size={20} />
          <span className="text-sm">Twitter</span>
        </button>

        <button
          onClick={() => shareChannel("facebook")}
          className={`${styles.button} ${styles.facebook}`}
        >
          <span
            dangerouslySetInnerHTML={{ __html: siFacebook.svg }}
            style={{
              width: 20,
              height: 20,
              display: "inline-block",
              fill: "#FFFFFF",
            }}
          />
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

export default ShareForm;
