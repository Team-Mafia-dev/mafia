import React, { useEffect, useState, useContext } from "react";
import RoomCard from "./RoomCard/RoomCard";
import CreateRoom from "./CreateRoom/CreateRoom"
import GameInfo from "./GameInfo/GameInfo"
import Profile from "./Profile/Profile";
import ToggleButton from "./ToggleButton/ToggleButton";
import "./Lobby.css";
import { FetchData } from "components/Util/FetchData";
import { UserContext } from "context/userContext";
import { useCookies } from 'react-cookie'; // 쿠키 사용

function Lobby() {
  const [roomData, setRoomData] = useState([]);
  const [stateType, setStateType] = useState(0); // 0전체 1대기중
  const [searchType, setSearchType] = useState(0); // 0방번호 1제목
  const [searchData, setSearchData] = useState(''); // 검색어를 저장하는 상태
  // 모달
  const [createRoomModalCondition, setCreateRoomModalCondition] = useState(false);
  const [gameInfoModalCondition, setGameInfoModalCondition] = useState(false);

  const [roomNumCookies] = useCookies(['roomNum']); // 쿠키 초기화
  const { user, setUser } = useContext(UserContext);

  console.log("user data in lobby!!",user);
  console.log("최근 접속한 방번호:", roomNumCookies.roomNum);

  // 서버로부터 데이터를 가져오는 함수
  const fetchRoomData = async (queryParams) => {
    try {
      const response = await FetchData(`room/list?${queryParams.toString()}`);
      if (response.isSuccess) {
        const data = await response.data;
        setRoomData(data); // 서버에서 받은 데이터를 상태에 저장
      } else {
        console.error("Failed to fetch rooms:", response.status);
      }
    } catch (error) {
      console.error("Error loading room data:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Context에 저장된 사용자 정보 복구 새로고침시 데이터 유지
    }
    const queryParams = new URLSearchParams();
    
    queryParams.append("stateType", stateType); // 상태 필터링에 사용되는 파라미터
    fetchRoomData(queryParams);
  }, [stateType, setUser]);

  const handleSearchTypeChange = (e) => {
    setSearchType(parseInt(e.target.value)); // 문자열로 들어오는 값을 숫자로 변환
  };

  // 검색어가 변경될 때 호출되는 함수
  const handleSearchDataChange = (e) => {
    setSearchData(e.target.value);
  };
  
  // 새로고침 버튼 클릭 시 서버로부터 데이터를 다시 가져옴
  const handleRefresh = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("stateType", stateType); // 상태 필터링에 사용되는 파라미터
    fetchRoomData(queryParams); // 서버와 동기화하여 최신 데이터 가져오기
  };

  const onClickSearchBtn = (e) => {
    e.preventDefault(); // 새로고침 방지
    const queryParams = new URLSearchParams();
    queryParams.append("stateType", stateType); // 상태 필터링에 사용되는 파라미터
    queryParams.append("searchType", searchType);
    queryParams.append("searchData", searchData);
    fetchRoomData(queryParams); // 서버와 동기화하여 최신 데이터 가져오기
  }

  // 검색어에 따라 방 제목을 필터링하는 로직
  // 데이터 배열 속에 객체 형식이므로 title같이 직접 호출해야 기능 사용가능
  //const filteredRooms = roomData
  //.filter((room) => room.title.toLowerCase().includes(searchQuery.toLowerCase()))  // 제목 필터
  //.filter((room) => stateType === 0 || room.state === stateType); // 상태 필터

  //Modal창의 상태가 true라면 보여지고 fasle라면 보이지 않게 한다.
  const openCreateRoomModal = () => {
    setCreateRoomModalCondition(!createRoomModalCondition)
  }

  const openGameInfoModal = () => {
    setGameInfoModalCondition(!gameInfoModalCondition)
  }

  return (
    <div>
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
          <form action="" className="search-from-container" onSubmit={onClickSearchBtn}>
            {/* url 활용해서 검색 가능 */}
            <select value={searchType} onChange={handleSearchTypeChange}>
              <option value="0">방번호</option>
              <option value="1">제목</option>
            </select>
            <input type="text" placeholder="Search.." name="search" value={searchData}
        onChange={handleSearchDataChange}/>
        
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </section>
      </div>
      <main className="lobby-main">
      <div className="room-list">
        {roomData.map((roomData) => (
          <RoomCard
            key={roomData.roomSeqno}
            seqno={roomData.roomSeqno}
            name={roomData.roomName}
            isStarted={roomData.isStarted}
            currNumPlayers={roomData.currNumPlayers}
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
    </div>
  );
}

export default Lobby;