import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { FetchData } from "../../components/Util/FetchData";

function LoginPage() {
  const navigate = useNavigate(); // navigate 훅 가져옴

  const handleLogin = async (userId, password) => {
    try {
      const postData = new FormData();
      postData.append("username", userId); // 'username' 필드에 userId 값 추가
      postData.append("password", password);
      const result = await FetchData(process.env.REACT_APP_API_LOGIN, postData);

      if (result.isSuccess) {
        alert("로그인되었습니다.");
        
        const userDataResult = await FetchData('user');
        const userData = userDataResult.data;
        console.log(userData);
        // 여기서 context에 넣어주면 됨. 난 어떻게 하는지 몰겠어

        navigate("/lobby");
      }else{
        alert(result.msg);
      }
    } catch (error) {
      alert("로그인에 실패하였습니다.");
      throw error;
    }
  };

  return (
    <>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}

export default LoginPage;
