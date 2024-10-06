import React, { useRef } from 'react';

function ChatStart() {
  const refRoom = useRef();
  const refId = useRef();

  const openChatWin = () => {
    window.open(
      // `/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
      `/talk?roomId=test1234&userId=testroom`,
      '',
      'width=500, height=800'
    );
  };

  return (
    <div>
      <h2 className='start_tit'>대화명 만들기</h2>
      채팅방 이름 :{' '}
      <input
        type="text"
        name="roomId"
        value="KIG_Chat"
        ref={refRoom}
        readOnly
      />
      <br />
      대화명 :{' '}
      <input
        type="text"
        name="userId"
        placeholder="채팅방에서 사용할 이름"
        ref={refId}
      />
      <br />
      <button type="button" onClick={openChatWin} className='start_btn'>
        채팅방 입장
      </button>
    </div>
  );
}

export default ChatStart;
