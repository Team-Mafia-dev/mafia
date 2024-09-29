import React, { useEffect, useState } from "react";
import RoomList from "./Room/RoomList";
import NavBar from "./NavBar/NavBar"
import Profile from "./Profile/Profile";
import "./Lobby.css";


//RoomList 컴포넌트에 방번호, 방제목, 방상태, 제한인원 정보를 전달해야한다. 서버와의 통신 필요 지금은 임의로 부여하겠다.

function Lobby() {
  const [data, setData] = useState([]);
  //useEffect로 rommData.json 파일의 변화를 감지하고 있다.
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/roomData.json`)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);
  return (
    <container>
      <NavBar/>
      <main className="lobby-main">
        <RoomList rooms={data} />
        <Profile/>
      </main>
    </container>
  );
}

export default Lobby;
