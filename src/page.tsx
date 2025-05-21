import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import styles from "./css/App.module.css";
import LoginPage from "./components/login/LoginPage";
import { useState } from "react";
export default function Home() {
  const [activeChannel, setActiveChannel] = useState("General");
  // const [activepage, setActivePage] = useState("Login");
  return (
    <>
      {/* {activepage == "Login" ? (
        <LoginPage />
      ) : (
        <div className={styles.app}>
          <Sidebar
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
          />
          <ChatInterface activeChannel={activeChannel} />
        </div>
      )} */}

        {/* <LoginPage /> */}

        <div className={styles.app}>
          <Sidebar
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
          />
          <ChatInterface activeChannel={activeChannel} />
        </div>
    </>
  );
}
