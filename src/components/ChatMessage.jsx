import './ChatMessage.css';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { realtime } from '../realtimeConfig';
import { child, onValue, push, ref, set } from 'firebase/database';

// 스크롤을 맨 아래로 이동시키는 함수
const scrollBottom = (chatWindow) => {
  if (chatWindow) {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
};

// Today 날짜 구하기 : YYYY-MM-DD 형식
const getCurrentDate = () => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
  const date = ('0' + dateObj.getDate()).slice(-2);
  // 요일 구하기
  const daysOfWeek = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const day = daysOfWeek[dateObj.getDay()];
  return `${year}년 ${month}월 ${date}일 ${day}`;
};

// 현재 시간 구하기 : HH:mm 형식
const getCurrentTime = () => {
  const dateObj = new Date();
  const hour = ('0' + dateObj.getHours()).slice(-2);
  const minutes = ('0' + dateObj.getMinutes()).slice(-2);
  return `${hour}:${minutes}`;
};

function ChatMessage() {
  // 파라미터 값 읽기
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');

  console.log('Room ID:', roomId);
  console.log('User ID:', userId);

  const chatWindow = useRef();
  const [chatData, setChatData] = useState('');

  // 대화 보내기
  function sendMessage(chatRoom, chatId, chatMessage) {
    const newKey = push(child(ref(realtime), 'tempValue')).key;
    set(ref(realtime, chatRoom + '/' + newKey), {
      id: chatId,
      message: chatMessage,
      date: getCurrentDate(),
      time: getCurrentTime(),
    });
    console.log('메세지 입력 성공');
  }

  // 대화(메세지 내역) 출력
  useEffect(() => {
    const dbRef = ref(realtime, roomId);
    onValue(dbRef, (snapshot) => {
      // scrollBottom(chatWindow.current);
      let showDiv = []; // 대화 내용 및 날짜를 보여줄 div 를 배열 변수로
      let previousDate = ''; // 이전 메세지의 날짜를 저장할 변수
      let previousUser = ''; // 이전 메세지를 보낸 user를 저장할 변수

      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const messageDate = childData.date;

        // 날짜 변경시에만 날짜 출력
        if (previousDate !== messageDate) {
          showDiv.push(
            <div
              key={`date-${childSnapshot.key}`}
              className="d-flex justify-content-center mb-3"
            >
              <div className="bg-dark rounded d-inline-flex align-items-center py-1 px-2">
                <img
                  src="/chat/images/calendar.png"
                  alt="calendar"
                  style={{ width: '1em', height: '1em', marginRight: '0.5rem' }}
                />
                <p className="time my-0 text-white">{messageDate}</p>
              </div>
            </div>
          );
          previousDate = messageDate; // 이전 날짜를 현재 날짜로 업데이트
        }

        // 보낸 메세지
        if (childData.id === userId) {
          showDiv.push(
            <div
              className="d-flex flex-row justify-content-end"
              key={childSnapshot.key}
            >
              <div>
                <p className="chatMsg small p-2 me-3 mb-1 rounded-3">
                  {childData.message}
                </p>
                <p className="time small me-3 mb-3 rounded-3 text-secondary d-flex justify-content-end">
                  {childData.time}
                </p>
              </div>
              {/* 이전 메시지와 다른 사용자가 보냈을 때만 프로필 이미지 표시 */}
              {previousUser !== childData.id ? (
                <img
                  src="/chat/images/profile.jpg"
                  alt="profile"
                  style={{ width: '45px', height: '100%', borderRadius: '50%' }}
                />
              ) : (
                <div style={{ width: '45px', height: '100%' }}></div> // 공백을 채울 div
              )}
            </div>
          );
        }
        // 받은 메세지
        else {
          showDiv.push(
            <div
              className="d-flex flex-row justify-content-start"
              key={childSnapshot.key}
            >
              {/* 이전 메시지와 다른 사용자가 보냈을 때만 프로필 이미지 표시 */}
              {previousUser !== childData.id ? (
                <img
                  src="/chat/images/profile-admin.jpg"
                  alt="admin"
                  style={{ width: '45px', height: '100%', borderRadius: '50%' }}
                />
              ) : (
                <div style={{ width: '45px', height: '100%' }}></div> // 공백을 채울 div
              )}
              <div>
                <p className="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">
                  {childData.message}
                </p>
                <p className="small ms-3 rounded-3 text-secondary">
                  {childData.time}
                </p>
              </div>
            </div>
          );
        }

        // 이전 사용자를 현재 메시지의 사용자로 업데이트
        previousUser = childData.userId;
      });
      setChatData(showDiv);
    });
  }, [roomId, userId]);

  // 대화 데이터가 변경될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    scrollBottom(chatWindow.current);
  }, [chatData]);

  return (
    <div>
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div className="card" id="chat2">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">{roomId}</h5>
                  <button
                    type="button"
                    className="exit_btn btn-sm"
                    onClick={() => {
                      window.self.close();
                    }}
                  >
                    상담 종료
                  </button>
                </div>
                <div
                  className="chatBody card-body
                  data-mdb-perfect-scrollbar-init"
                  ref={chatWindow}
                >
                  {chatData}
                </div>
                <div className="card-footer d-flex justify-content-start align-items-center p-3">
                  <img
                    src="/chat/images/profile.jpg"
                    alt="profile"
                    style={{
                      width: '45px',
                      height: '100%',
                      borderRadius: '50%',
                    }}
                  />
                  &nbsp;&nbsp;
                  <form
                    style={{ width: '100%', display: 'flex' }}
                    onSubmit={(event) => {
                      event.preventDefault();
                      let message = event.target.message.value;
                      if (message === '') {
                        return;
                      }
                      sendMessage(roomId, userId, message);
                      event.target.message.value = '';
                    }}
                  >
                    <input
                      type="text"
                      name="message"
                      className="inputChat form-control form-control-lg"
                    />
                    &nbsp;&nbsp;
                    <button
                      type="submit"
                      className="submit_btn rounded-3"
                    ></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatMessage;
