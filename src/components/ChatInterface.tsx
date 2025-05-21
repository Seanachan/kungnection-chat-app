import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { Message } from "../types";
import CodeBlock from "./CodeBlock";
import styles from "../css/ChatInterface.module.css"
import MarkdownRenderer from "./MarkdownRenderer";

const ChatInterface = ({ activeChannel }: { activeChannel: string }) => {
  const [messagesByChannel, setMessagesByChannel] = useState<
    Record<string, Message[]>
  >({
    General: [
      {
        id: 1,
        user: "System",
        content:
          "Welcome to CodeChat! Try sending some code by wrapping it in triple backticks.",
        timestamp: new Date().toISOString(),
        avatar: "https://placehold.co/400",
      },
    ],
  });

  const [newMessage, setNewMessage] = useState("");
  const messages = messagesByChannel[activeChannel] || [];
  
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Check if message contains code blocks with line breaks
    const isCode =
      /^```[\s\S]*\n[\s\S]*```$/.test(newMessage.trim()) ||
      /^[^\n]*\n```[\s\S]*\n[\s\S]*```$/.test(newMessage.trim());

    setMessagesByChannel({
      ...messagesByChannel,
      [activeChannel]: [
        ...(messagesByChannel[activeChannel] || []),
        {
          id: (messagesByChannel[activeChannel]?.length || 0) + 1,
          user: "You",
          content: newMessage,
          timestamp: new Date().toISOString(),
          avatar: "https://placehold.co/400",
          isCode,
        },
      ],
    });
    setNewMessage("");
  };

  const splitMessage = (content: string) => {
    const parts = content.split(/(```\w*\n[\s\S]+?\n```)/g);
    return parts.filter((part) => part.length > 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.channelTitle}># {activeChannel}</h2>
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
                return /^```\n.*\n```$/s.test(part) ||
                  /^```\w*\n[\s\S]+?\n```$/g.test(part) ? (
                  <CodeBlock key={idx} code={part} />
                ) : (
                  <MarkdownRenderer content={part} />
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
            <Send size={20} /> {/*This is Lucide-icon the little plane*/}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
