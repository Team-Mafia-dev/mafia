import React, { useState } from "react";
import "./ToggleButton.css"; // 스타일을 위한 CSS 파일을 추가

const ToggleButton = ({setStateType}) => {
  const [isToggled, setIsToggled] = useState(false);

  // 대기 중과 게임 중을 토글하는 함수
  const handleToggle = () => {
    setIsToggled(!isToggled);
    setStateType(isToggled ? 1 : 0);
  };
  
  return (
    <div className="toggle-container">
    <div className="toggle-text">{isToggled ? "대기중인 방" : "전체 방"}</div>
    <div
    className={`toggle-button ${isToggled ? "active" : ""}`}
    onClick={handleToggle}
  >
    <div className="toggle-circle"></div>
  </div></div>
  );
};

export default ToggleButton;
