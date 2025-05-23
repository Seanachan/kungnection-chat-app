import type React from "react";
import { useState } from "react";
import styles from "../css/ChannelForm.module.css";
import { Loader2 } from "lucide-react";

interface CreateChannelFormProps {
  onCreate: (channelName: string, isVoice: boolean) => void;
  onCancel: () => void;
}

export default function CreateChannelForm({
  onCreate,
  onCancel,
}: CreateChannelFormProps) {
  const [channelName, setChannelName] = useState("");
  const [isVoice, setIsVoice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!channelName.trim()) {
      setError("Please enter a channel name");
      return;
    }

    // Validate channel name (alphanumeric and hyphens only)
    if (!/^[a-z0-9-]+$/.test(channelName)) {
      setError(
        "Channel name can only contain lowercase letters, numbers, and hyphens"
      );
      return;
    }
    setIsVoice(false);
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would make an API call to create the channel
      // For now, we'll simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onCreate(channelName, isVoice);
    } catch (err) {
      setError("Failed to create channel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="channel-name" className={styles.label}>
          Channel Name
        </label>
        <input
          type="text"
          id="channel-name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value.toLowerCase())}
          placeholder="e.g. general, javascript, python"
          className={styles.input}
          disabled={isLoading}
        />
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.helpText}>
          Use lowercase letters, numbers, and hyphens only.
        </p>
      </div>

      <div className={styles.buttonRow}>
        {/* <div className={styles.voiceCheckRow}>
          <input
            type="checkbox"
            id="is-voice"
            checked={isVoice}
            onChange={(e) => setIsVoice(e.target.checked)}
            disabled={isLoading}
          />
          <label htmlFor="is-voice" >
            Voice Channel
          </label>
        </div> */}
        <button
          type="button"
          onClick={onCancel}
          className={styles.button}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className={styles.spinner} />
              Creating...
            </>
          ) : (
            "Create Channel"
          )}
        </button>
      </div>
    </form>
  );
}
