"use client"

import { useState } from "react"
import { Hash, Cat, Code, Mic } from "lucide-react"
import styles from "./Sidebar.module.css"

interface Channel {
  id: string
  name: string
  icon: React.ReactNode
}

export default function Sidebar() {
  const [activeChannel, setActiveChannel] = useState("General")

  const textChannels: Channel[] = [
    { id: "General", name: "General", icon: <Hash size={20} /> },
    { id: "Game", name: "Game", icon: <Cat size={20} /> },
    { id: "Music", name: "Music", icon: <Hash size={20} /> },
    { id: "JavaScript", name: "JavaScript", icon: <Code size={20} /> },
  ]

  const voiceChannels: Channel[] = [
    { id: "voice-general", name: "Voice General", icon: <Mic size={20} /> },
    { id: "voice-coding", name: "Voice Coding", icon: <Mic size={20} /> },
  ]

  return (
    <aside className={styles.sidebar}>
      <div className={styles.channelSection}>
        <h2 className={styles.channelHeader}>TEXT CHANNELS</h2>
        <ul className={styles.channelList}>
          {textChannels.map((channel) => (
            <li key={channel.id}>
              <button
                className={`${styles.channelButton} ${
                  activeChannel === channel.id ? styles.active : ""
                }`}
                onClick={() => setActiveChannel(channel.id)}
              >
                <span className={styles.channelIcon}>{channel.icon}</span>
                <span>{channel.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.channelSection}>
        <h2 className={styles.channelHeader}>VOICE CHANNELS</h2>
        <ul className={styles.channelList}>
          {voiceChannels.map((channel) => (
            <li key={channel.id}>
              <button
                className={`${styles.channelButton} ${
                  activeChannel === channel.id ? styles.active : ""
                }`}
                onClick={() => setActiveChannel(channel.id)}
              >
                <span className={styles.channelIcon}>{channel.icon}</span>
                <span>{channel.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
