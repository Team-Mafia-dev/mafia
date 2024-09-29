import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./ToggleButton.css"; // 스타일을 위한 CSS 파일을 추가

const ToggleButton = () => {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);

  // 대기 중과 게임 중을 토글하는 함수
  const handleToggle = (filter) => {
    setIsToggled(!isToggled);
    navigate(`?status=${filter}`);
  };
  

  


  return (
    <div className="toggle-container">
    <div className="toggle-text">{isToggled ? "대기중인 방" : "전체 방"}</div>
    <div
    className={`toggle-button ${isToggled ? "active" : ""}`}
    onClick={isToggled ? () => handleToggle('all') : () => handleToggle('waiting')}
  >
    <div className="toggle-circle"></div>
  </div></div>
  );
};

export default ToggleButton;
