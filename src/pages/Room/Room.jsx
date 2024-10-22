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

  const { user, setUser } = useContext(UserContext);
  const { dayAndNight,setDayAndNight,} = useContext(SystemContext); //systemContext 정보 접근

  const [roomNumCookies] = useCookies(['roomNum']); // 쿠키 값 가져오기 인자로는 key값을 입력하면됨
  const storedUser = localStorage.getItem('user');
  
  // 서버에서 타임스탬프 찍어줌
  // const getCurrentTime = () => {
  //   const now = new Date();
  //   return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // };

  // useEffect(()=>{
  //   // 타이머 시작 함수 (useRef로 타이머 관리)
  //   const startTimer = () => {
  //     timerRef.current = setInterval(() => {
  //       setTimeLeft((prevTime) => {
  //         if (prevTime <= 1) {
  //           handleRoundChange(); // 라운드 전환
  //           return ROUND_TIME; // 새로운 라운드 시작
  //         }
  //         return prevTime - 1; // 매초 감소
  //       });
  //     }, 1000);
  //   };
  //   startTimer();

  //   // 라운드 전환 함수
  //   const handleRoundChange = () => {
  //     setDayAndNight((prev) => !prev); // 낮/밤 전환
  //   };
  //   return () => clearInterval(timerRef.current); // 컴포넌트 언마운트 시 타이머 정리
  // }, [setDayAndNight]);

  const handleRoundChange = () => {
    setDayAndNight((prev) => !prev); // 낮/밤 전환
  };

  // 메시지를 수신했을 때 처리
  const callBackMessageReceived = (response) => {
    const message = response.data;
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

  // 서버에 해당 유저 정보 등록을 위한 전송
  const callBackConnect = () => {
    console.log("handleConnect!!!!");
    const userInfo = {
      userId : storedUser.id,
      userName : storedUser.name,
      profileImage : storedUser.profileImage,
      roomId : roomNumCookies.roomNum 
    }
    console.log("handleConnect data:",userInfo)
    sendToSocket(process.env.REACT_APP_SOCKET_REGISTER_USER, userInfo);
  }

  // 게임 시작 버튼 콜백
  const callBackGameStart = (response) => {
    console.log(response.data);

    const data = response.data;
    const roleNo = data.roleNo; // 0 : 시민, 1 : 마피아, 2 경찰, 3 의사
    const timeLeft = data.timeLeft; // 남은 시간

    setTimeLeft(timeLeft);

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // 희성아 이건 지금 클라이언트에서 처리해주는데,
          // 어차피 서버에서 남으시간 계산해서
          // 밤, 낮 전환도 서버에서 보내줄 거라 여기서는 그냥 시간 뺴는 것만 계속 보여주면 될듯
          handleRoundChange(); // 라운드 전환
          return ROUND_TIME; // 새로운 라운드 시작
        }
        return prevTime - 1; // 매초 감소
      });
    }, 1000);
  }

  // 서버에서 유저에게 방에서 나가라는 메시지
  const callBackLeaveRoom = () => {
    socketDisconnect();
    navigate('/lobby');
  }

  // 방에 있는 플레이어 정보를 받아온다(완료했으니 적용)
  const callBackSetPlayerInfos = (response) => {
    // 희성 TODO : 다른 플레이어 리스트도 playerListContext 같이 만들어서 관리해주면 될 것 같다.
    // 데이터가 어떻게 생겼는지는 게임 들어가서 콘솔 찍어보면 나와
    console.log("playerList : " + response.data);
  }

  // WebSocket 훅 사용
  const { socketConnect, sendToSocket, socketDisconnect } = useWebSocket({
    onConnect: callBackConnect,
    CHAT_MESSAGE: callBackMessageReceived,
    SET_PLAYERINFOS: callBackSetPlayerInfos,
    LEAVE_ROOM: callBackLeaveRoom,
    GAME_START: callBackGameStart,
  });
  
  useEffect(()=>{
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Context에 저장된 사용자 정보 복구 새로고침시 데이터 유지
    }
    console.log("user data in room",user);
    const roomNum = roomNumCookies.roomNum;
    console.log('쿠키에서 가져온 값:', roomNum);

    if (!roomNum) {
      alert('방 번호가 없습니다. 로비로 이동합니다.');
      navigate('/lobby'); // 방 번호가 없으면 로비로 이동
    }
    socketConnect();
  },[roomNumCookies.roomNum, navigate, socketConnect]);

  // 메시지 보내기
  const handleSendMessage = (message) => {
    // 사용자의 메시지로 추가
    const newMessage = {
      text: message
    }
    
    // 메시지 전송
    sendToSocket(process.env.REACT_APP_SOCKET_CHAT_MESSAGE, newMessage);
  };

  // 방 떠나기
  const handleLeave = () => {
    if(window.confirm("정말 게임을 떠나시겠습니까?")){
      sendToSocket(process.env.REACT_APP_SOCKET_LEAVE_ROOM);
      socketDisconnect();
      navigate('/lobby');
    }else {
      return;
    }
  }

  // 게임 시작
  const handleStart = () =>{
    sendToSocket(process.env.REACT_APP_SOCKET_GAME_START);
  }

  return (
    <PageContainer $dayAndNight={dayAndNight}>
      <StyledChatContainer>
        <button onClick={handleLeave}>나가기</button>
        <MessageContainer messages={messages} />
        <InputField onSend={handleSendMessage} />
      </StyledChatContainer>
  
      <RoomInfoSection>
        <button onClick={handleStart}>시작하기</button>
        <h2>{dayAndNight ? "밤이 되었습니다.":"낮이 되었습니다."}</h2>
        <div className="round-time">남은 시간: {timeLeft}초</div>

        <Collapsible title={"프로필"}>
        <p>플레이어 목록 만들거임</p>
        <div className="profile-box">

        </div>
        </Collapsible>

        <Collapsible title={"메모"}>
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
  background-color: ${(props) => (props.$dayAndNight ? "#444a4f" : "#f1f1f1")};
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