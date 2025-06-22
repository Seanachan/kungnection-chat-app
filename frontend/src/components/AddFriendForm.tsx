import type React from "react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import styles from "../css/ChannelForm.module.css";
import { BASE_URL } from "../config";

interface AddFriendFormProps {
  onCancel: () => void;
  type: string;
  onSuccess: () => void;
}

export default function AddFriendForm({
  onCancel,
  onSuccess,
}: AddFriendFormProps) {
  const [friendID, setfriendID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!friendID.trim()) {
      setError("Please enter a Friend's ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to add a friend.");
        setIsLoading(false);
        return;
      }
      console.log(friendID);
      const response = await fetch(
        `${BASE_URL}/user/friends/add?username=${friendID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const text = await response.text();
      if (!response.ok) {
        setError("Invalid Friend ID");
        setIsLoading(false);
        return;
      }
      console.log(text);
      onCancel();
      // handleAddFriend(text, type);
      onSuccess();
    } catch (err) {
      setError("Failed to add a friend. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="channel-code" className={styles.label}>
          Enter Friend's ID
        </label>
        <input
          type="text"
          id="channel-code"
          value={friendID}
          onChange={(e) => setfriendID(e.target.value)}
          placeholder="Friend's ID"
          className={styles.input}
          disabled={isLoading}
        />
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.helpText}>
          Enter a Friend's shared via link.
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
            "Add Friend"
          )}
        </button>
      </div>
    </form>
  );
}
