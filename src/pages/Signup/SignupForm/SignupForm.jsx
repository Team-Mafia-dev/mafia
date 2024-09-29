// src/components/Signup.js
import React, { useState } from "react";
import "./SignupForm.css";

const SignupForm = ({ onSignup }) => {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !nickname || !password) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    // 회원가입 로직 실행
    onSignup(id, password, nickname);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="input-group">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </div>
        <button type="submit" className="signup-button">
          회원가입
        </button>
        <div className="login-redirect">
          <p>
            이미 계정이 있으신가요? <a href="/login">로그인</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
