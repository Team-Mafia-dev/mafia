import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "context/userContext";
import { SystemContext } from "context/systemContext";

import Collapsible from "components/Collapsible/Collapsible";


// 메시지 리스트를 보여주는 컴포넌트
const MessageContainer = ({ messages }) => {
  const messageEndRef = useRef(null);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로 내리는 효과
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <StyledMessageContainer>
      {messages.map((message, index) => (
        <StyledMessage key={index} isUser={message.isUser}>
          {!message.isUser && (
            <ProfileImage src={message.profileImage} alt={message.username} />
          )}
          <MessageContent>
            <MessageHeader>
              {!message.isUser && <Username>{message.username}</Username>}
              <Timestamp>{message.timestamp}</Timestamp>
            </MessageHeader>
            <MessageBubble isUser={message.isUser}>
              {message.text}
            </MessageBubble>
          </MessageContent>
        </StyledMessage>
      ))}
      {/* 스크롤을 아래로 내리기 위한 참조 요소 */}
      <div ref={messageEndRef} />
    </StyledMessageContainer>
  );
};

// 메시지를 입력하는 필드
const InputField = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput(""); // 메시지 전송 후 입력 필드 비우기
    }
  };
  // Enter 키를 감지하여 메시지를 전송하는 함수
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <StyledInputContainer>
      <StyledInputField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleOnKeyDown}
        placeholder="메시지를 입력하세요..."
      />
      <StyledSendButton onClick={handleSend}>전송</StyledSendButton>
    </StyledInputContainer>
  );
};

// 메인 채팅 컴포넌트
const Room = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext); // useContext로 유저 정보 접근
  const { dayAndNight } = useContext(SystemContext); //systemContext 정보 접근
  console.log(dayAndNight);

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

const StyledMessageContainer = styled.div
`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const StyledMessage = styled.div
`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const ProfileImage = styled.img
`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MessageContent = styled.div
`
  display: flex;
  flex-direction: column;
`;

const MessageHeader = styled.div
`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Username = styled.span
`
  font-size: 12px;
  color: #555;
  margin-bottom: 5px;
`;

const Timestamp = styled.span
`
  font-size: 10px;
  color: #999;
`;

const MessageBubble = styled.div
`
  background-color: ${(props) => (props.isUser ? "#007bff" : "#e0e0e0")};
  color: ${(props) => (props.isUser ? "#fff" : "#000")};
  padding: 8px;
  border-radius: 5px;
  max-width:100%;
  word-wrap: break-word;
`;

const StyledInputContainer = styled.div
`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
`;

const StyledInputField = styled.input
`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const StyledSendButton = styled.button
`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// 오른쪽 정보화면 스타일
const RoomInfoSection = styled.section
`
  width: 400px;
  padding: 10px
`

export default Room;
