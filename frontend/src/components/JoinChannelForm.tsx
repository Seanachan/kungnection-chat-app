import type React from "react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import styles from "../css/ChannelForm.module.css";

interface JoinChannelFormProps {
  onJoin: (code: string) => void;
  onCancel: () => void;
}

export default function JoinChannelForm({
  onJoin,
  onCancel,
}: JoinChannelFormProps) {
  const [channelCode, setChannelCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!channelCode.trim()) {
      setError("Please enter a channel code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would make an API call to validate the code
      // For now, we'll simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, let's validate some "fake" codes
      if (channelCode === "invalid") {
        setError("Invalid channel code");
        setIsLoading(false);
        return;
      }

      onJoin(channelCode);
    } catch (err) {
      setError("Failed to join channel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="channel-code" className={styles.label}>
          Channel Code or Invite Link
        </label>
        <input
          type="text"
          id="channel-code"
          value={channelCode}
          onChange={(e) => setChannelCode(e.target.value)}
          placeholder="Enter channel code or invite link"
          className={styles.input}
          disabled={isLoading}
        />
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.helpText}>
          Enter a channel code to join an existing channel. For voice channels,
          use "voice-" prefix.
        </p>
      </div>

      <div className={styles.buttonRow}>
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
              Joining...
            </>
          ) : (
            "Join Channel"
          )}
        </button>
      </div>
    </form>
  );
}
