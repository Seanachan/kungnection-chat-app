import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import styles from "./App.module.css";
import { useState } from "react";
export default function Home() {
  const [activeChannel, setActiveChannel] = useState("General");
  return (
    <div className={styles.app}>
      <Sidebar
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      />
      <ChatInterface activeChannel={activeChannel} />
    </div>
  );
}
