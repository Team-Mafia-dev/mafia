import React, { useEffect, useState } from "react";
import RoomList from "./Room/RoomList";

//RoomList 컴포넌트에 방번호, 방제목, 방상태, 제한인원 정보를 전당해야한다. 서버와의 통신 필요 지금은 임의로 부여하겠다.

function Robe() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/roomData.json`)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);
  return (
    <>
      <section>
        <RoomList rooms={data} />
      </section>
    </>
  );
}

export default Robe;
