import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-blue-900 text-blue-100">
      <Sidebar />
      <ChatInterface />
    </div>
  );
}
