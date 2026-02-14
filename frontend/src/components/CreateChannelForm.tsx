import type React from "react";
import { useState } from "react";
import styles from "../css/ChannelForm.module.css";
import { Loader2 } from "lucide-react";
import {BASE_URL} from "../config"

interface CreateChannelFormProps {
  onCancel: () => void;
  type: string;
  onSuccess?: () => void;
}

export default function CreateChannelForm({
  onCancel,
  type,
  onSuccess
}: CreateChannelFormProps) {
  const [channelName, setChannelName] = useState("");
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
        "Channel name can only contain lowercase letters, numbers, and hyphens",
      );
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create a channel.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/user/channels`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${token}`,
        },
        body: channelName,
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to create channel.");
      }

      await response.json();

      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || "Failed to create channel. Please try again.");
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
            `"Create ${type} Channel"`
          )}
        </button>
      </div>
    </form>
  );
}
