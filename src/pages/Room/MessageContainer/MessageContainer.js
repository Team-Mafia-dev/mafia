import React, {useEffect,useRef} from "react";
import styled from "styled-components";

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

export default MessageContainer;

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