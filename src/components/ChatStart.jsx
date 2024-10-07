import React, { useRef, useState } from 'react';

function ChatStart() {
  const refRoom = useRef();
  const refId = useRef();

  const [roomId, setRoomId] = useState("chat-");

  const openChatWin = () => {
    window.open(
      `#/chat?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      '',
      'width=500, height=500'
    );
  };

  return (
    <div className='chatStart'>
      <h2 className="start_tit">대화명 만들기</h2>
      채팅방 이름 :{' '}
      <input
        type="text"
        name="roomId"
        value={roomId}
        placeholder="채팅할 유저의 아이디"
        ref={refRoom}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <br />
      대화명 :{' '}
      <input type="text" name="userId" value="admin" ref={refId} readOnly />
      <br />
      <button type="button" onClick={openChatWin} className="start_btn">
        채팅방 입장
      </button>
    </div>
  );
}

export default ChatStart;
