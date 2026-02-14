import type React from "react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import styles from "../css/ChannelForm.module.css";
import {BASE_URL} from "../config"

interface JoinChannelFormProps {
  onCancel: () => void;
  type: string;
  onSuccess?: () => void;
}

export default function JoinChannelForm({
  onCancel,
  type,
  onSuccess,
}: JoinChannelFormProps) {
  const [channelCode, setChannelCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleJoinChannel = async (_message: string, _type: string) => {
    onCancel(); // Close modal after successful join
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!channelCode.trim()) {
      setError("Please enter a channel code");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to join a channel.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `${BASE_URL}/user/channels/join?code=${channelCode}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const text = await response.text();
      if (!response.ok) {
        setError("Invalid or expired channel code");
        setIsLoading(false);
        return;
      }
      handleJoinChannel(text, type);
      onSuccess?.();
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
