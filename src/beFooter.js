import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FetchData } from "./components/Util/FetchData";
import Input from "./components/input/input";
import "./Footer.css";
import {Button} from "./styles/ButtonStyle"

//프로필 부분 css로 단독 형태를 띈 프로필 창 만들면됨 fixed 말인거
//화면 구성 기능

function Footer() {
  const location = useLocation(); // 현재 URL을 가져옴
  const newbiImage = process.env.PUBLIC_URL + "/images/newbi.jpg";

  // [Start] 로비 테스트

  const [stateType, setStateType] = useState(""); // 게임 시작 여부

  // 방 생성하기
  // 방 생성 폼 -> 사용자가 입력 방제목 정의할 수 있는 창
  const RegisterRoom = async () => {
    // TODO 방 이름 파라미터로 받아서 대입시키기
    const postData = { roomName: "테스트입니다." };
    const result = await FetchData("room/register", postData);

    if (result.isSuccess) {
      alert("방 생성을 완료하였습니다.");
      setStateType("waiting")
      // TODO 게임 화면으로 이동
    }
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

  // 특정 URL에 따라 다른 내용을 렌더링
  if (
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup"
  ) {
    return (
      <footer>
        <p>&copy; 2024-08-25 마피아 게임 될 예정</p>
      </footer>
    );
  } else if (location.pathname === "/lobby") {
    return (
      <footer>
        <div className="navbar-container">
          <div href="/userProfile" className="navbar-item userProfile">
            <img src={newbiImage} alt="userImage" className="userImage" />
            <div className="userInfo">
              <dl>
                <dt>유저이름</dt>
                <dt>승률 2승/3패</dt>
              </dl>
            </div>
          </div>

          <div>
            <Button onClick={RegisterRoom} className="btn red small">
              방 만들기
            </Button>
            <Button className="btn gray small" onClick={ReloadRoomList}>
              새로고침
            </Button>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer>
      <div className="profile"></div>
      <Input />
    </footer>
  );
}

export default Footer;
