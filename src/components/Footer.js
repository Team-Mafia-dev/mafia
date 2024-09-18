import React from "react";
import { useLocation } from "react-router-dom";
import Input from "./input/input";
import "./Footer.css";

//프로필 부분 css로 단독 형태를 띈 프로필 창 만들면됨 fixed 말인거

function Footer() {
  const location = useLocation(); // 현재 URL을 가져옴
  const newbiImage = process.env.PUBLIC_URL + "/images/newbi.jpg";

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
          <button href="/friendList" className="btn gray small">
            친구목록
          </button>
          <div>
            <button className="btn red small">방만들기</button>
            <button className="btn gray small"></button>
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
