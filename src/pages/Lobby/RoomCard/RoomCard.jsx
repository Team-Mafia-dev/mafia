import React from "react";
import { Link } from "react-router-dom";
import "./RoomCard.css";

// Room UI
// Link - useParams함수를 이용해 매개변수를 읽어 올 수 있음.
const RoomCard = ({ seqno, name, isStarted, currNumPlayers }) => {
  // if (status !== "게임중") {
  //   const roomLink = `${no}room`;
  // }

  return (
    <Link to={`/room/${seqno}`} className="room-card">
      <div className="room-card-top">
        <p className="room-card-seqno">{String(seqno).padStart(4, '0')}</p>
        <button className="room-card-is-started">{isStarted ? "게임중" : "대기중"}</button>
      </div>
      <div className="room-card-bottom">
        <p className="room-card-name">{name}</p>
        <p className="room-card-curr-players">{currNumPlayers}/16</p>
      </div>
    </Link>
  );
};

export default RoomCard;
