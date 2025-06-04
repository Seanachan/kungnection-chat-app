import { Clipboard } from "lucide-react";
import styles from "../css/Share.module.css";
interface settingsProp {
  activeChannel: string;
}
const SettingsChannel = ({}) =>{

}
const SettingsForm: React.FC<settingsProp> = ({}) => {

  return (
    <>
      <div className={styles.SettingsRow}>
        <button
          onClick={() => SettingsChannel("whatsapp")}
          className={`${styles.button} ${styles.whatsapp}`}
        >
          <span className="text-sm">WhatsApp</span>
        </button>

        <button
          onClick={() => SettingsChannel("telegram")}
          className={`${styles.button} ${styles.telegram}`}
        >
          <span className="text-sm">Telegram</span>
        </button>
      </div>

      <div className={styles.SettingsRow}>
        <button
          onClick={() => SettingsChannel("twitter")}
          className={`${styles.button} ${styles.twitter}`}
        >
          <span className="text-sm">Twitter</span>
        </button>

        <button
          onClick={() => SettingsChannel("facebook")}
          className={`${styles.button} ${styles.facebook}`}
        >
          <span className="text-sm">Facebook</span>
        </button>
      </div>
      <button
        onClick={() => SettingsChannel("copy")}
        className={`${styles.button} ${styles.copy}`}
      >
        <Clipboard size={20} />
        <span className="text-sm">Copy Invite Link</span>
      </button>
    </>
  );
};

export default SettingsForm;
