// src/components/Login.js
import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    // 로그인 로직을 실행
    onLogin(userId, password);
    //console.log("email : ", email, "password : ", password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label htmlFor="email">아이디</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
        <button type="submit" className="login-button">
          로그인
        </button>
        <div className="forgot-password">
          <a href="/forgot-password">비밀번호를 잊으셨나요?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
