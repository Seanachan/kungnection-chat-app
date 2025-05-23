import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import styles from "./css/App.module.css";
import LoginPage from "./components/login/LoginPage";
import { useState } from "react";
export default function Home() {
  const [activeChannel, setActiveChannel] = useState("General");
  const [token, setToken] = useState("");
  return (
    <>
      {token === "" ? (
        <LoginPage setToken={setToken} />
      ) : (
        <div className={styles.app}>
          <Sidebar
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
          />
          <ChatInterface activeChannel={activeChannel} />
        </div>
      )}
    </>
  );
}
