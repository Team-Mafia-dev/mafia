import React, {useState} from "react";

import ToggleButton from "./ToggleButton/ToggleButton"
import CreateRoom from "./CreateRoom/CreateRoom"
import GameInfo from "./GameInfo/GameInfo"
import Search from "./Search/Search";
import "./NavBar.css";

function NavBar() {
  const [createRoomModalCondition, setCreateRoomModalCondition] = useState(false);
  const [gameInfoModalCondition, setGameInfoModalCondition] = useState(false);
//모달창은 초기화면에서는 보이지 않기 때문에 초깃값은 false

const closeCreateRoomModal = () => {
	setCreateRoomModalCondition(false)
  //또는 
  setCreateRoomModalCondition(!createRoomModalCondition)
}
const closeGameInfoModal = () => {
	setGameInfoModalCondition(false)
  //또는 
  setGameInfoModalCondition(!gameInfoModalCondition)
}
//Modal창의 상태가 true라면 보여지고 fasle라면 보이지 않게 한다.

// 새로고침(검색 반영 X)
const ReloadRoomList = () => {
  const queryParams = new URLSearchParams();
  queryParams.append("stateType", this.state.stateType);

  this.GetRoomList(queryParams);
};

  return (
    <>
    <div className="topnav">
      <button onClick={closeGameInfoModal}>게임 설명</button>
      <button >모달1</button>
      <button >모달2</button>
      
      <section className="search-container">
        <div>
          <button onClick={closeCreateRoomModal}>방 만들기</button>
          <button onClick={ReloadRoomList}>새로고침</button>
        </div>
        {/* 방 필터 대기중인 방과 나머지로 구분하는게 효율적일듯 함 토글형식으로 바꾸겠음*/}
        <ToggleButton />
        <Search/>
      </section>
    </div>
    {createRoomModalCondition && (
      <CreateRoom
      closeCreateRoomModal={() => setCreateRoomModalCondition(!createRoomModalCondition)}/>
      )}
    {gameInfoModalCondition && (
      <GameInfo
      closeGameInfoModal={() => setGameInfoModalCondition(!gameInfoModalCondition)}/>
    )}
    </>
  );
}

export default NavBar;
