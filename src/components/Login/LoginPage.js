import React from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate(); //navigate 훅 가져옴
  const handleLogin = (email, password) => {
    //서버로 로그인 요청 보내기
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        //서버에서 받은 응답이 성공하지 못했을 때
        if (!response.ok) {
          throw new Error("로그인에 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        // 로그인 성공 처리
        // 데이터 성공적으로 받아옴.
        // 상태 로그인 true
        console.log("로그인 성공:", data);
        navigate("/robe");
      })
      .catch((error) => {
        // 로그인 실패 처리
        console.error("로그인 에러:", error);
      });
  };
  return (
    <>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}

export default LoginPage;
