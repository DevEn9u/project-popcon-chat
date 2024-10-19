import './ChatStart.css';
import React, { useRef, useState } from "react";

function ChatStart() {
  const refRoom = useRef();
  const refId = useRef();

  const [roomId, setRoomId] = useState("chat-");

  const openChatWin = () => {
    window.open(
      `#/chat?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      "",
      "width=500, height=840"
    );
  };

  return (
    <div className="chatStart">
      <h2 className="start_tit">채팅 입장 - 관리자</h2>
      <div className="inner">
        <div className="input_wrap">
          <p>채팅방 이름 :{" "}</p>
          <input
            type="text"
            name="roomId"
            value={roomId}
            placeholder="채팅할 유저의 아이디"
            ref={refRoom}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        <div className="input_wrap">
          <p>대화명 :{" "}</p>
          <input type="text" name="userId" value="admin" ref={refId} readOnly />
        </div>
        <button type="button" onClick={openChatWin} className="start_btn">
          채팅방 입장
        </button>
      </div>
    </div>
  );
}

export default ChatStart;
