import React from "react";
import "./Room.css";

// Room UI
const Room = ({ no, title, status, maxPlayers }) => {
  return (
    <div className="room">
      <div className="room-top">
        <p className="room-no">No. {no}</p>
        <button className="room-status">{status}</button>
      </div>
      <div className="room-bottom">
        <p className="room-title">{title}</p>
        <p className="room-players">{maxPlayers}</p>
      </div>
    </div>
  );
};

export default Room;
