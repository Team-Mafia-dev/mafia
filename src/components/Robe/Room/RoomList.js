import React from "react";
import Room from "./Room";
import "./RoomList.css";

//map() 매서드를 사용해 배열의 각요소에 대해 주어진 함수를 호출해서 그 결과를 새로운 배열을 (Room)생성함.
function RoomList({ rooms }) {
  return (
    <div className="room-list">
      {rooms.map((room, index) => (
        <Room
          key={index}
          no={room.no}
          title={room.title}
          status={room.status}
          maxPlayers={room.maxPlayers}
        />
      ))}
    </div>
  );
}

export default RoomList;
