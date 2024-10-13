import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./RoomCard.css";

// Room UI
// Link - useParams함수를 이용해 매개변수를 읽어 올 수 있음.
const RoomCard = ({ seqno, name, isStarted, currNumPlayers }) => {
  const [roomNumCookie,setRoomNumCookie] = useCookies(['roomNum']); // 쿠키 초기화
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  // 쿠키 설정
  // 방 번호를 쿠키에 설정하고 페이지 이동
  const handleRoomEnter = () => {
    setRoomNumCookie('roomNum', seqno, { path: '/', maxAge: 3600 }); // 쿠키 설정 (1시간 유효)
    console.log('Room number in cookie!!', roomNumCookie);
    navigate(`/room/${seqno}`); // 방으로 이동
  };

  return (
    <div className="room-card" onClick={handleRoomEnter}>
      <div className="room-card-top">
        <p className="room-card-seqno">{String(seqno).padStart(4, '0')}</p>
        <button className="room-card-is-started">{isStarted ? "게임중" : "대기중"}</button>
      </div>
      <div className="room-card-bottom">
        <p className="room-card-name">{name}</p>
        <p className="room-card-curr-players">{currNumPlayers}/16</p>
      </div>
    </div>
  );
};

export default RoomCard;
