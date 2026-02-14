import { Clipboard } from "lucide-react";
import styles from "../css/Settings.module.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { UserInfo } from "../types/index.ts";
interface SettingsProps {
  activeChannel: { code: string; name: string };
  channels: any[];
}

export default function Settings({ activeChannel, channels }: SettingsProps) {
  const onShare = (platform: string) => {
    const shareText = `Join me in the ${activeChannel.name} channel on Kungnection! Use code: ${activeChannel.code}`;

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
  const [, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [settings, setSettings] = useState({
    messageNotifications: true,
    soundEffects: true,
    emailNotifications: false,
    showOnlineStatus: true,
    readReceipts: true,
    compactMode: false,
    theme: "dark",
    fontSize: "medium",
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectChange = (
    key: string,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    handleSettingChange(key, event.target.value);
  };

  const handleToggleChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleSettingChange(key, event.target.checked);
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in.");
          return;
        }
        const response = await fetch(`${BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        setUserInfo({
          username: data.username,
          email: data.email,
          nickname: data.nickname,
        });
      } catch (err) {
        setError("Failed to fetch user info. Please try again.");
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {/* Personal Info Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <div className={styles.personalInfoCard}>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                <span className={styles.avatarText}>
                  {userInfo?.nickname ? userInfo.nickname.substring(0, 1) : ""}
                </span>
              </div>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{userInfo?.username}</p>
                <p className={styles.userEmail}>{userInfo?.email}</p>
                <p className={styles.userStatus}>● Online</p>
              </div>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Member since:</span>
                <p className={styles.statValue}>January 2024</p>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Messages sent:</span>
                <p className={styles.statValue}>1,247</p>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Channels joined:</span>
                <p className={styles.statValue}>
                  {channels.length + channels.length}
                </p>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Time spent:</span>
                <p className={styles.statValue}>42h 15m</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Notifications</h3>
          <div className={styles.settingsGroup}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <p className={styles.settingTitle}>Message notifications</p>
                <p className={styles.settingDescription}>
                  Get notified when someone mentions you
                </p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  className={styles.toggleInput}
                  checked={settings.messageNotifications}
                  onChange={(e) =>
                    handleToggleChange("messageNotifications", e)
                  }
                />
                <div className={styles.toggleSlider}></div>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <p className={styles.settingTitle}>Sound effects</p>
                <p className={styles.settingDescription}>
                  Play sounds for notifications
                </p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  className={styles.toggleInput}
                  checked={settings.soundEffects}
                  onChange={(e) => handleToggleChange("soundEffects", e)}
                />
                <div className={styles.toggleSlider}></div>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}></div>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Appearance</h3>
          <div className={styles.formGroup}>
            <div>
              <label className={styles.label}>Theme</label>
              <select
                className={styles.select}
                value={settings.theme}
                onChange={(e) => handleSelectChange("theme", e)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <label className={styles.label}>Font size</label>
              <select
                className={styles.select}
                value={settings.fontSize}
                onChange={(e) => handleSelectChange("fontSize", e)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}></div>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Privacy</h3>
          <div className={styles.settingsGroup}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <p className={styles.settingTitle}>Show online status</p>
                <p className={styles.settingDescription}>
                  Let others see when you're online
                </p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  className={styles.toggleInput}
                  checked={settings.showOnlineStatus}
                  onChange={(e) => handleToggleChange("showOnlineStatus", e)}
                />
                <div className={styles.toggleSlider}></div>
              </label>
            </div>

            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <p className={styles.settingTitle}>Read receipts</p>
                <p className={styles.settingDescription}>
                  Show when you've read messages
                </p>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  className={styles.toggleInput}
                  checked={settings.readReceipts}
                  onChange={(e) => handleToggleChange("readReceipts", e)}
                />
                <div className={styles.toggleSlider}></div>
              </label>
            </div>
          </div>
        </div>

        {/* Share Channel Section */}
        <div className={styles.shareSection}>
          <h3 className={styles.shareTitle}>Share Current Channel</h3>
          <p className={styles.shareDescription}>
            Share "{activeChannel.name}" with your friends
          </p>

          <div className={styles.shareGrid}>
            <button
              onClick={() => onShare("whatsapp")}
              className={`${styles.shareButton} ${styles.whatsappButton}`}
            >
              <span className={styles.buttonText}>WhatsApp</span>
            </button>

            <button
              onClick={() => onShare("telegram")}
              className={`${styles.shareButton} ${styles.telegramButton}`}
            >
              <span className={styles.buttonText}>Telegram</span>
            </button>

            <button
              onClick={() => onShare("twitter")}
              className={`${styles.shareButton} ${styles.twitterButton}`}
            >
              <span className={styles.buttonText}>Twitter</span>
            </button>

            <button
              onClick={() => onShare("facebook")}
              className={`${styles.shareButton} ${styles.facebookButton}`}
            >
              <span className={styles.buttonText}>Facebook</span>
            </button>
          </div>

          <button onClick={() => onShare("copy")} className={styles.copyButton}>
            <Clipboard className={styles.copyIcon} />
            <span className={styles.buttonText}>Copy Invite Link</span>
          </button>
        </div>

        {/* Account Actions */}
        <div className={styles.accountActions}>
          <div className={styles.actionButtonGroup}>
            <button
              className={`${styles.actionButton} ${styles.primaryButton}`}
              onClick={() => {
                window.location.href = "/edit-profile";
              }}
            >
              Edit Profile
            </button>
            <button
              className={`${styles.actionButton} ${styles.secondaryButton}`}
              onClick={() => {
                window.location.href = "/change-passwd";
              }}
            >
              Change Password
            </button>
          </div>
          <button
            className={styles.signOutButton}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.setItem("isLoggedIn", "false");
              window.location.href = "/";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
