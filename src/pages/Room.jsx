import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MessageContainer from "../components/MessageContainer/MessageContainer";
import InputField from "../components/InputField/InputField";
import Socket from "../components/Util/server";
import "./styles/Room.css";

//여기서 소캣 통신 하면됨
// Room UI
// Link - useParams함수를 이용해 매개변수를 읽어 올 수 있음.
// 방에 들어오면 휘발성 번호 부여 필요 유저 ID랑 유저 닉네임 총 3개 정보 필요
// 방장은 보통 빨강 방만들기, 채팅방만들기, 방들어가기, 플레이업 번호에 따른닉네임 채팅내용에도 색갈표시,
const Room = () => {
  const { nomberParams } = useParams();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // console.log("nomberParams :", nomberParams); 현재 URL 중 no 부분을 받아옴.

  useEffect(() => {
    Socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    askUserName();
  });

  //서버가 login 요청을 받아 userName을 알려줌
  const askUserName = () => {
    Socket.on("login", (res) => {
      if (res?.ok) {
        const userName = res.userName;
        setUser(userName);
      }
    });
  };

  const sendMessage = (event) => {};
  return (
    <div className="room">
      {nomberParams}번째 방에 입장하였습니다.
      <MessageContainer messageList={messageList} user={user} />
      <InputField
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Room;
