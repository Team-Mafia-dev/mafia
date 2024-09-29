import React from "react";
import SignupForm from "./SignupForm/SignupForm";
import { useNavigate } from "react-router-dom";
import { FetchData } from "../../components/Util/FetchData";

function SignupPage() {
  const navigate = useNavigate(); //navigate 훅 가져옴
  const handleSignup = async (id, password, nickname) => {
    const postData = { userId: id, pw: password, userNm: nickname };
    // 회원가입
    const result = await FetchData(process.env.REACT_APP_API_SIGNUP, postData);
    // 회원가입 성공 시 로그인으로 이동
    if (result.isSuccess) {
      navigate("/login");
    }
  };
  return (
    <>
      <SignupForm onSignup={handleSignup} />
    </>
  );
}

export default SignupPage;
