import React from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate(); //navigate 훅 가져옴
  const handleLogin = async (userId, password) => {
    try {
      const postData = {userId: userId, pw: password};
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      if (result.isSuccess) {
        alert(result.msg);
        navigate("/robe");
      } else {
        alert(result.msg);
      }
    } catch (error) {
      alert("로그인에 실패하였습니다.(에러)");
    }
  };
  return (
    <>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}

export default LoginPage;
