import React from "react";
import { Link } from "react-router-dom";
import "./RoomCard.css";

// Room UI
// Link - useParams함수를 이용해 매개변수를 읽어 올 수 있음.
const RoomCard = ({ no, title, status, currPlayers }) => {
  // if (status !== "게임중") {
  //   const roomLink = `${no}room`;
  // }

  return (
    <Link to={`/room/${no}`} className="room-card">
      <div className="room-card-top">
        <p className="room-card-no">No. {no}</p>
        <button className="room-card-status">{status}</button>
      </div>
      <div className="room-card-bottom">
        <p className="room-card-title">{title}</p>
        <p className="room-card-players">{currPlayers}</p>
      </div>
    </Link>
  );
};

export default RoomCard;
