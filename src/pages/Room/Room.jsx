import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "context/userContext";
import { SystemContext } from "context/systemContext";
import useWebSocket from "./Hooks/useWebSocket";

import Collapsible from "components/Collapsible/Collapsible";
import MessageContainer from "./MessageContainer/MessageContainer";
import InputField from "./InputField/InputField";


// 메인 채팅 컴포넌트
const Room = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext); // userContext 유저 정보 접근
  const { dayAndNight } = useContext(SystemContext); //systemContext 정보 접근
  
  // 서버에서 타임스탬프 찍어줌
  // const getCurrentTime = () => {
  //   const now = new Date();
  //   return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // };

  useEffect(()=>{
    console.log("user!!! : " + user.id);
  }, []);

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
    console.log("handleCOnnect!!!!");
    console.log(user);
    const userInfo = {
      userId : user.id,
      userName : user.name,
      profileImage : user.profileImage,
      roomdId : '1'   // roomSeqno 받아서 여기에서 보내줘야됨
    }
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

  return (
    <PageContainer dayAndNight={dayAndNight}>
      <StyledChatContainer>
        <MessageContainer messages={messages} />
        <InputField onSend={handleSendMessage} />
      </StyledChatContainer>
  
      <RoomInfoSection>
        <h2>{dayAndNight ? "밤이 되었습니다.":"낮이 되었습니다."}</h2>

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