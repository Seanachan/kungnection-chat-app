import Sidebar from "./Sidebar";
import Chat from "./Chat";
type Channel = { code: string; name: string };
export default function ChatInterface({
  activeChannel,
  setActiveChannel,
}: {
  activeChannel: { code: string; name: string };
  setActiveChannel: (activeChannel: Channel) => void;
}) {
  return (
    <div style={{ display: "flex", height:"100vh", overflow: "hidden"}}>
      <aside>
        <Sidebar
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />
      </aside>
      <Chat activeChannel={activeChannel} />
    </div>
  );
}
