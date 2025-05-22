import type React from "react";
import { useState } from "react";
import styles from "../css/ChannelForm.module.css";

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
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
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
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
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
