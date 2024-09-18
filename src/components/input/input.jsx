import React, { useState } from "react";
import "./input.css";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // 메시지 전송 후 입력 필드 초기화
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        className="chat-input"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
      <button className="send-btn" onClick={handleSendMessage}>
        입력
      </button>
    </div>
  );
};

export default ChatInput;
