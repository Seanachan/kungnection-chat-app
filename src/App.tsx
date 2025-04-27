import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <ChatInterface />
    </div>
  );
}

export default App;
