import React, { useState } from "react";
import "./Collapsible.css"; // 스타일은 기존 CSS를 사용하되 클래스명을 수정

// Collapsible 컴포넌트
const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button type="button" className={isOpen ? "collapsible active" : "collapsible"} onClick={handleToggle}>
        {title}
      </button>
      <div className="content" style={{ display: isOpen ? "block" : "none" }}>
        {children}
      </div>
    </div>
  );
};

export default Collapsible;