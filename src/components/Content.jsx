import React from "react";
import { Link } from "react-router-dom";
import "./Content.css";

function Content() {
  //react의 public 폴더 구조 특유의 이미지 파일 가져오는 방법
  const mafiaImage = process.env.PUBLIC_URL + "/images/main-bg-img.png";
  return (
    <div class="image-container">
      <img src={mafiaImage} alt="mafia-bg" class="centered-image" />
      <div class="button-group">
        <Link to="/signup" class="button">
          회원가입
        </Link>
        <Link to="/login" class="button">
          로그인
        </Link>
      </div>
    </div>
  );
}

export default Content;
