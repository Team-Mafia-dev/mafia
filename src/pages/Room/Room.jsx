import React, { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "context/userContext";
import { SystemContext } from "context/systemContext";
import useWebSocket from "./Hooks/useWebSocket";

import Collapsible from "components/Collapsible/Collapsible";
import MessageContainer from "./MessageContainer/MessageContainer";
import InputField from "./InputField/InputField";
import { useCookies } from 'react-cookie';

// 메인 채팅 컴포넌트
const Room = () => {
  const navigate = useNavigate();
  const ROUND_TIME = 10; // 각 라운드 시간 (초 단위)

  const [messages, setMessages] = useState([]);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME); // 남은 시간 상태
  const timerRef = useRef(null); // 타이머 참조

  const { user } = useContext(UserContext); // userContext 유저 정보 접근
  const {
    dayAndNight,
    setDayAndNight,
    isStarted,
    setIsStarted
  } = useContext(SystemContext); //systemContext 정보 접근

  const [roomNumCookies] = useCookies(['roomNum']); // 쿠키 값 가져오기 인자로는 key값을 입력하면됨
  
  // 서버에서 타임스탬프 찍어줌
  // const getCurrentTime = () => {
  //   const now = new Date();
  //   return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // };

  useEffect(()=>{
    const roomNum = roomNumCookies.roomNum;
    console.log('쿠키에서 가져온 값:', roomNum);

    if (!roomNum) {
      alert('방 번호가 없습니다. 로비로 이동합니다.');
      navigate('/lobby'); // 방 번호가 없으면 로비로 이동
    }
  },[roomNumCookies.roomNum, navigate])
  useEffect(()=>{
    // 타이머 시작 함수 (useRef로 타이머 관리)
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleRoundChange(); // 라운드 전환
            return ROUND_TIME; // 새로운 라운드 시작
          }
          return prevTime - 1; // 매초 감소
        });
      }, 1000);
    };
    startTimer();

    // 라운드 전환 함수
    const handleRoundChange = () => {
      setDayAndNight((prev) => !prev); // 낮/밤 전환
    };
    return () => clearInterval(timerRef.current); // 컴포넌트 언마운트 시 타이머 정리
  }, [isStarted, setDayAndNight]);

  // 메시지를 수신했을 때 처리
  const handleMessageReceived = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: message.text,
        isOwner: message.isOwner,
        username: message.userName,
        profileImage: user.profileImage, // 유저이미지를 숫자나 text로 가지고 와서 프로필이미지 매니저같은 곳에서 가져오기 message.profileImage || "",
        timestamp: message.getCurrentTime,
      },
    ]);
  };

  // // 서버에 해당 유저 정보 등록을 위한 전송
  const handleConnect = ()=>
   {
    console.log("handleConnect!!!!");
    console.log(user);
    
    const userInfo = {
      userId : user.id,
      userName : user.name,
      profileImage : user.profileImage,
      roomdId : roomNumCookies.roomNum 
    }
    console.log("handleConnect data:",userInfo)
    sendToSocket(process.env.REACT_APP_SOCKET_REGISTER_USER, userInfo);
  };

  // WebSocket 훅 사용
  const { sendToSocket } = useWebSocket({
    onConnect: handleConnect,
    CHAT_MESSAGE: handleMessageReceived
  });

  const handleSendMessage = (message) => {
    // 사용자의 메시지로 추가
    const newMessage = {
      text: message
    }
    
    // 메시지 전송
    sendToSocket(process.env.REACT_APP_SOCKET_CHAT_MESSAGE, newMessage);
  };

  const handleLeave = () => {
    if(window.confirm("정말 게임을 떠나시겠습니까?")){
      navigate('/lobby');
    }else {
      return;
    }
  }
  const handleStart = () =>{
    
  }

  return (
    <PageContainer dayAndNight={dayAndNight}>
      <StyledChatContainer>
        <button onClick={handleLeave}>나가기</button>
        <MessageContainer messages={messages} />
        <InputField onSend={handleSendMessage} />
      </StyledChatContainer>
  
      <RoomInfoSection>
        {!isStarted ? (<button onClick={handleStart}>시작하기</button>) : (<h2>진행중</h2>)}
        <h2>{dayAndNight ? "밤이 되었습니다.":"낮이 되었습니다."}</h2>
        <div className="round-time">남은 시간: {timeLeft}초</div>

        <Collapsible title={"직업 투표"}>
        <p>튜표 이미지들이 들어갈 예정</p>
        </Collapsible>

        <Collapsible title={"직업 메모"}>
        <p>참여한 플레이어들 수 만큼 체크박스 이미지들이 들어갈 예정</p>
        </Collapsible>
      </RoomInfoSection>
      
    </PageContainer>
  );
};

export default Room;


// 스타일 정의
const PageContainer = styled.div
`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background-color: ${(props) => (props.dayAndNight ? "#444a4f" : "#f1f1f1")};
  padding: 10px;
  gap: 5%;
`;

const StyledChatContainer = styled.div
`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95%;
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;

  @media (max-width: 768px) {
    height: 90vh;
    width: 100%;
  }
`;

// 오른쪽 정보화면 스타일
const RoomInfoSection = styled.section
`
  width: 400px;
  padding: 10px
`