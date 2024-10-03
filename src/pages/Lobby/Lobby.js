import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard/RoomCard";
import CreateRoom from "./CreateRoom/CreateRoom"
import GameInfo from "./GameInfo/GameInfo"
import Profile from "./Profile/Profile";
import ToggleButton from "./ToggleButton/ToggleButton";
import "./Lobby.css";

function Lobby() {
  const [roomData, setRoomData] = useState([]);
  //0전체 1대기중
  const [stateType, setStateType] = useState(0);
  // 검색어를 저장하는 상태
  const [searchQuery, setSearchQuery] = useState('');
  // 모달
  const [createRoomModalCondition, setCreateRoomModalCondition] = useState(false);
  const [gameInfoModalCondition, setGameInfoModalCondition] = useState(false);

  // 서버로부터 데이터를 가져오는 함수
  // 서버 fetch 부분 우리 서버에 맞게 수정 부탁함. -희성-
  const fetchRoomData = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("stateType", stateType); // 상태 필터링에 사용되는 파라미터

    try {
      const response = await fetch(`/api/rooms?${queryParams.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setRoomData(data); // 서버에서 받은 데이터를 상태에 저장
      } else {
        console.error("Failed to fetch rooms:", response.status);
      }
    } catch (error) {
      console.error("Error loading room data:", error);
    }
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/roomData.json`)
      .then((response) => response.json())
      .then((jsonData) => setRoomData(jsonData))
      .catch((error) => console.error("Error loading JSON:", error));

    fetchRoomData();
  }, [stateType]);

  // 검색어가 변경될 때 호출되는 함수
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // 새로고침 버튼 클릭 시 서버로부터 데이터를 다시 가져옴
  const handleRefresh = () => {
    fetchRoomData(); // 서버와 동기화하여 최신 데이터 가져오기
  };

  // 검색어에 따라 방 제목을 필터링하는 로직
  // 데이터 배열 속에 객체 형식이므로 title같이 직접 호출해야 기능 사용가능
  const filteredRooms = roomData
  .filter((room) => room.title.toLowerCase().includes(searchQuery.toLowerCase()))  // 제목 필터
  .filter((room) => stateType === 0 || room.state === stateType); // 상태 필터

  //Modal창의 상태가 true라면 보여지고 fasle라면 보이지 않게 한다.
  const openCreateRoomModal = () => {
    setCreateRoomModalCondition(false)
    //또는 
    setCreateRoomModalCondition(!createRoomModalCondition)
  }
  const openGameInfoModal = () => {
    setGameInfoModalCondition(false)
    //또는 
    setGameInfoModalCondition(!gameInfoModalCondition)
  }

  return (
    <container>
      <div className="topnav">
        <button onClick={openGameInfoModal}>게임 설명</button>
        <button >모달1</button>
        <button >모달2</button>
        
        <section className="search-container">
          <div>
            <button onClick={openCreateRoomModal}>방 만들기</button>
            <button onClick={handleRefresh}>새로고침</button>
          </div>
          <ToggleButton setStateType={setStateType}/>
          <form action="" className="search-from-container" onSubmit={(e) => {
            e.preventDefault(); // 새로고침 방지
            fetchRoomData(); // 서버와 동기화하여 최신 데이터 가져오기
          }}>{/* url 활용해서 검색 가능 */}
            <input type="text" placeholder="Search.." name="search" value={searchQuery}
        onChange={handleSearchChange}/>
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </section>
      </div>
      <main className="lobby-main">
      <div className="room-list">
        {filteredRooms.map((roomData, index) => (
          <RoomCard
            key={index}
            no={roomData.no}
            title={roomData.title}
            state={roomData.state ? "대기중" : "게임중"}
            currPlayers={roomData.currPlayers}
          />
        ))}
      </div>
        <Profile/>
      </main>
      {createRoomModalCondition && (
      <CreateRoom
      closeCreateRoomModal={() => setCreateRoomModalCondition(!createRoomModalCondition)}/>
      )}
      {gameInfoModalCondition && (
        <GameInfo
        closeGameInfoModal={() => setGameInfoModalCondition(!gameInfoModalCondition)}/>
      )}
    </container>
  );
}

export default Lobby;