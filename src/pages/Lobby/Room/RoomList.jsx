import React from "react";
import RoomCard from "./RoomCard";
import "./RoomList.css";

//map() 매서드를 사용해 배열의 각요소에 대해 주어진 함수를 호출해서 그 결과를 새로운 배열을 (Room)생성함.
const RoomList = ({ rooms }) => {
  return (
    <div className="room-list">
      {rooms.map((room, index) => (
        <RoomCard
          key={index}
          no={room.no}
          title={room.title}
          status={room.status}
          currPlayers={room.currPlayers}
        />
      ))}
    </div>
  );
};

export default RoomList;