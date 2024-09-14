import React from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { FetchData } from "../Util/FetchData";

function LoginPage() {
  const navigate = useNavigate(); //navigate 훅 가져옴
  
  const handleLogin = async (userId, password) => {
    try {
      const postData = new FormData();
      postData.append('username', userId); // 'username' 필드에 userId 값 추가
      postData.append('password', password);
      const result = await FetchData(process.env.REACT_APP_API_LOGIN, postData);

      if (result.isSuccess) {
        navigate("/robe"); 
      } else {
        alert(result.msg);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  };

  const testGetUser = async () => {
    const postData = {roomName: "테스트입니다."};
    const result = await FetchData("room/register", postData);
    console.log(result);
    if(result.status === 401){
      navigate("/");
    }
  };

  return (
    <>
      <button onClick={testGetUser}>ss</button>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}

export default LoginPage;

