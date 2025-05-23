import { useState, FormEvent } from "react";
import { Plus, Send, UserPlus } from "lucide-react";
import { Message } from "../types";
import CodeBlock from "./CodeBlock";
import styles from "../css/ChatInterface.module.css";
import MarkdownRenderer from "./MarkdownRenderer";
import Modal from "./Modal";
import JoinChannelForm from "./JoinChannelForm";
import CreateChannelForm from "./CreateChannelForm";
// import voiceChannels from "./VoiceChannels";

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
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const handleCreateChannel = (code: string) => {
    console.log(code)
  };
  const handleJoinChannel = (code: string) => {
    // In a real app, this would fetch channel details from the backend
    // For demo purposes, we'll create a new channel based on the code

    // Check if it's a voice channel code (starts with "voice-")
    if (code.startsWith("voice-")) {
      // const channelName = code.replace("voice-", "");
      // const newChannel = {
      //   id: code,
      //   name: channelName,
      //   icon: <Mic size={20} />,
      // };
    } else if (code.startsWith("text-")) {
      // const channelName = code.replace("voice-", "");
      // const newChannel = {
      //   id: code,
      //   name: channelName,
      //   icon: <Hash size={20} />,
      // };
    }

    // Close the modal
    setIsJoinModalOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.channelTitleContainer}>
          <h2 className={styles.channelTitle}># {activeChannel}</h2>
          <div>
            <button
              className={styles.addFriendButton}
              title="Join Channel"
              onClick={() => setIsJoinModalOpen(true)}
            >
              <UserPlus size={20} />
            </button>

            <button
              className={styles.addFriendButton}
              title="Create Channel"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={20} />
            </button>
          </div>
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

      {/* Join Channel Modal */}
      <Modal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        title="Join a Channel"
      >
        <JoinChannelForm
          onJoin={handleJoinChannel}
          onCancel={() => setIsJoinModalOpen(false)}
        />
      </Modal>

      {/* Create Channel Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create a Channel"
      >
        <CreateChannelForm
          onCreate={handleCreateChannel}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ChatInterface;
