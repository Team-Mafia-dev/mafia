import React, { useState } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";

const MessageContainer = ({ messageList, user }) => {
  //내 채팅 상대 채팅 시스템 채팅을 나누기 위한 jsx 문법 옵셔널 체이닝 적용
  return (
    <div>
      {messageList.map((message, index) => {
        return (
          <Container key={message._id} className="message-container">
            {message.user.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <img
                  src="/profile.jpeg"
                  className="profile-image"
                  style={
                    (index === 0
                      ? { visibility: "visible" }
                      : messageList[index - 1].user.name === user.name) ||
                    messageList[index - 1].user.name === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
