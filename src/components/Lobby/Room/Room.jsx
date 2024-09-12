import React from "react";
// import socket from "./server";
import { useParams } from "react-router-dom";
// import MessageContainer from "../../MessageContainer/MessageContainer";
// import InputField from "../../InputField/InputField";
import "./Room.css";

//여기서 소캣 통신 하면됨
// Room UI
// Link - useParams함수를 이용해 매개변수를 읽어 올 수 있음.
// 방에 들어오면 휘발성 번호 부여 필요 유저 ID랑 유저 닉네임 총 3개 정보 필요
// 방장은 보통 빨강 방만들기, 채팅방만들기, 방들어가기, 플레이업 번호에 따른닉네임 채팅내용에도 색갈표시,
const Room = () => {
  const { nomberParams } = useParams();
  // console.log("nomberParams :", nomberParams); 현재 URL 중 no 부분을 받아옴.

  return <div className="room">{nomberParams}번째 방에 입장하였습니다.</div>;
};

export default Room;
