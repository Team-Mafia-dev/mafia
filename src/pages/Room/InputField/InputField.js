import React, { useState } from "react";
import styled from "styled-components";

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

export default InputField;

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