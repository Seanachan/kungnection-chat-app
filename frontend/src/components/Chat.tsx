import { useState, FormEvent, useEffect } from "react";
import { Send } from "lucide-react";
import { Message } from "../types";
import CodeBlock from "./CodeBlock";
import styles from "../css/ChatInterface.module.css";
import MarkdownRenderer from "./MarkdownRenderer";
import Share from "./Share";
import { BASE_URL } from "../config";
// import voiceChannels from "./VoiceChannels";

const Chat = ({
  activeChannel,
}: {
  activeChannel: { code: string; name: string; type: string } | null;
}) => {
  const [messagesByChannel, setMessagesByChannel] = useState<
    Record<string, Message[]>
  >({});
  const [newMessage, setNewMessage] = useState("");

  // Get messages for current channel (safe even if activeChannel is null)
  const messages = activeChannel ? (messagesByChannel[activeChannel.code] || []) : [];

  // Effect: poll backend for new messages every 3 seconds
  useEffect(() => {
    if (!activeChannel?.code) return;

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          activeChannel.type === "personal"
            ? `${BASE_URL}/messages/friend/${activeChannel.code}`
            : `${BASE_URL}/messages/channel/${activeChannel.code}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) return;

        const data = await response.json();
        setMessagesByChannel((prev) => ({
          ...prev,
          [activeChannel.code]: data.map((msg: { id: number; senderName: string; content: string; timestamp: string }) => ({
            id: msg.id,
            user: msg.senderName,
            content: msg.content,
            timestamp: msg.timestamp,
            avatar: "https://placehold.co/400",
            isCode:
              /^```[\s\S]*\n[\s\S]*```$/.test(msg.content.trim()) ||
              /^[^\n]*\n```[\s\S]*\n[\s\S]*```$/.test(msg.content.trim()),
          })),
        }));
      } catch {
        // Handle fetch messages error silently
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [activeChannel]);

  // Early return after hooks
  if (!activeChannel || !activeChannel.code) {
    return null;
  }

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(
        activeChannel.type === "personal"
          ? `${BASE_URL}/messages/friend/${activeChannel.code}`
          : `${BASE_URL}/messages/channel/${activeChannel.code}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
          body: newMessage,
        },
      );

      if (!response.ok) return;

      const data = await response.json();

      const isCode =
        /^```[\s\S]*\n[\s\S]*```$/.test(newMessage.trim()) ||
        /^[^\n]*\n```[\s\S]*\n[\s\S]*```$/.test(newMessage.trim());

      setMessagesByChannel((prev) => ({
        ...prev,
        [activeChannel.code]: [
          ...(prev[activeChannel.code] || []),
          {
            id: data.id,
            user: data.senderName,
            content: data.content,
            timestamp: data.timestamp,
            avatar: "https://placehold.co/400",
            isCode,
          },
        ],
      }));
      setNewMessage("");
    } catch {
      // Handle send message error silently
    }
  };

  const splitMessage = (content: string) => {
    const parts = content.split(/(```\w*\n[\s\S]+?\n```)/g);
    return parts.filter((part) => part.length > 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.channelTitleContainer}>
          <h2 className={styles.channelTitle}># {activeChannel.name}</h2>
          <Share activeChannel={activeChannel} />
        </div>
      </div>

      <div className={styles.messageArea}>
        {messages.map((message) => (
          <div key={message.id} className={styles.messageGroup}>
            <img
              src={message.avatar || "/placeholder.svg"}
              alt={message.user}
              className={styles.avatar}
            />
            <div className={styles.messageContent}>
              <div className={styles.messageHeader}>
                <span className={styles.username}>{message.user}</span>
                <span className={styles.timestamp}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {splitMessage(message.content).map((part, idx) => {
                const key = `${message.id}-${idx}`;
                return /^```\n.*\n```$/s.test(part) ||
                  /^```\w*\n[\s\S]+?\n```$/g.test(part) ? (
                  <CodeBlock key={key} code={part} />
                ) : (
                  <MarkdownRenderer key={key} content={part} />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputArea}>
        <form onSubmit={handleSendMessage} className={styles.inputForm}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder="Send a message..."
            className={styles.messageInput}
          />
          <button type="submit" className={styles.sendButton}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
