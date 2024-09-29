import React, { useState } from "react";
import "./ToggleButton.css"; // 스타일을 위한 CSS 파일을 추가

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
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
