import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "context/userContext";
import { SystemContext } from "context/systemContext";

import Collapsible from "components/Collapsible/Collapsible";
import MessageContainer from "./MessageContainer/MessageContainer";
import InputField from "./InputField/InputField";


// 메인 채팅 컴포넌트
const Room = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext); // userContext 유저 정보 접근
  const { dayAndNight } = useContext(SystemContext); //systemContext 정보 접근

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = (message) => {
    // 사용자의 메시지로 추가
    setMessages([
      ...messages,
      {
        text: message,
        isUser: true,
        username: user.name,
        profileImage: user.profileImage,
        timestamp: getCurrentTime()
      }
    ]);
    
    // 상대방의 메시지 예시 추가
    // 테스트 하기 위한 코드임
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "상대방의 답장입니다.",
          isUser: false,
          username: "Player1",
          profileImage: user.profileImage,
          timestamp: getCurrentTime()
        }
      ]);
    }, 1000);
  };

  return (
    <PageContainer dayAndNight={dayAndNight}>
      <StyledChatContainer>
        <MessageContainer messages={messages} />
        <InputField onSend={handleSend} />
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