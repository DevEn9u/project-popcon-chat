import "./App.css";
import ChatMessage from "./components/ChatMessage";

function App() {
  // JSP에서 설정한 전역 변수를 사용
  const userId = window.userId; // JSP에서 전달받은 userId
  const roomId = `user-${userId}`; // userId를 기반으로 roomId 생성
  return (
    <div className="App">
      <ChatMessage roomId={roomId} userId={userId} />
    </div>
  );
}

export default App;
