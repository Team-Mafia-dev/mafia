import React from "react";
import { Link } from "react-router-dom";
import "./styles/Content.css";

function Content() {
  //react의 public 폴더 구조 특유의 이미지 파일 가져오는 방법
  const mafiaImage = process.env.PUBLIC_URL + "/images/main-bg-img.png";
  return (
    <div className="image-container">
      <img src={mafiaImage} alt="mafia-bg" className="centered-image" />
      <div className="button-group">
        <Link to="/signup" className="button">
          회원가입
        </Link>
        <Link to="/login" className="button">
          로그인
        </Link>
      </div>
    </div>
  );
}

export default Content;
