import React from "react";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate(); //navigate 훅 가져옴
  const handleSignup = async (id, password, nickname) => {
    try {
      const postData = {userId: id, pw: password, userNm: nickname};
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      if (result.isSuccess) {
        alert(result.msg);
        navigate("/login");
      } else {
        alert(result.msg);
      }
    } catch (error) {
      alert("회원가입에 실패하였습니다.(에러)");
    }

  };
  return (
    <>
      <SignupForm onSignup={handleSignup} />
    </>
  );
}

export default SignupPage;
