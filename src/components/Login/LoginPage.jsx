import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { FetchData } from "../Util/FetchData";

function LoginPage() {
  const navigate = useNavigate(); // navigate 훅 가져옴

  const handleLogin = async (userId, password) => {
    try {
      const postData = new FormData();
      postData.append("username", userId); // 'username' 필드에 userId 값 추가
      postData.append("password", password);
      const result = await FetchData(process.env.REACT_APP_API_LOGIN, postData);

      if (result.isSuccess) {
        // navigate("/lobby");
        alert("로그인 완료(세션갱신)");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    }
  };

  // [Start] 로비 테스트

  const [stateType, setStateType] = useState("0"); // 게임 시작 여부
  const [searchType, setSearchType] = useState("0"); // 검색 타입
  const [searchData, setSearchData] = useState(""); // 검색 입력 데이터

  // 방 생성하기
  const RegisterRoom = async () => {
    // TODO 방 이름 파라미터로 받아서 대입시키기
    const postData = { roomName: "테스트입니다." };
    const result = await FetchData("room/register", postData);

    if (result.isSuccess) {
      alert("방 생성을 완료하였습니다.");
      // TODO 게임 화면으로 이동
    }
  };

  // 게임 시작 여부로 룸 리스트 가져오기
  const SearchIsStarted = (paramStateType) => {
    setStateType(paramStateType);

    const queryParams = new URLSearchParams();
    queryParams.append("stateType", paramStateType);

    GetRoomList(queryParams);
  };

  // 방 정보 검색으로 방 데이터 가져오기
  const SearchRoomData = () => {
    const queryParams = new URLSearchParams();
    if (stateType) {
      queryParams.append("stateType", stateType);
    }
    if (searchType) {
      queryParams.append("searchType", searchType);
    }
    if (searchData) {
      queryParams.append("searchData", searchData);
    }
    GetRoomList(queryParams);
  };

  // 새로고침(검색 반영 X)
  const ReloadRoomList = () => {
    const queryParams = new URLSearchParams();
    queryParams.append("stateType", stateType);

    GetRoomList(queryParams);
  };

  // 방 정보 가져오기
  const GetRoomList = async (queryParams) => {
    const result = await FetchData(`room/list?${queryParams}`);
    console.log();
    if (result.isSuccess) {
      console.log(result.data);
    }
  };
  // [END] 로비 테스트

  return (
    <>
      <button onClick={RegisterRoom}>방 생성</button>
      <br />
      <label>
        <input
          type="radio"
          name="stateType"
          value="0"
          checked={stateType === "0"}
          onChange={() => SearchIsStarted("0")}
        />
        방 리스트(전체)
      </label>
      <label>
        <input
          type="radio"
          name="stateType"
          value="1"
          checked={stateType === "1"}
          onChange={() => SearchIsStarted("1")}
        />
        방 리스트(대기중)
      </label>
      <br />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="0">방 번호</option>
        <option value="1">방 이름</option>
        {/* 필요한 타입 추가 */}
      </select>

      <input
        type="text"
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
        placeholder="검색 데이터 입력"
      />
      <button onClick={SearchRoomData}>검색</button>
      <br />
      <button onClick={ReloadRoomList}>새로고침</button>

      <LoginForm onLogin={handleLogin} />
    </>
  );
}

export default LoginPage;
