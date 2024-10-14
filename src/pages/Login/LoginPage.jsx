import React , { useContext }from "react";
import LoginForm from "./LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { FetchData } from "../../components/Util/FetchData";
import { UserContext } from "context/userContext";

function LoginPage() {
  const navigate = useNavigate(); // navigate 훅 가져옴
  const { setUser } = useContext(UserContext);
  //const profileImage = process.env.PUBLIC_URL + "/images/newbi.jpg";

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
        const userInfo = {
          id: userData.userId || "userId",
          name: userData.userNm || "userName",
          profileImage: userData.profileImage || 0,
          winCnt: userData.winCnt || 0,
          loseCnt: userData.loseCnt || 0,
          resentRoom: null,
        };
         // 사용자 정보를 로컬 스토리지에 저장
        localStorage.setItem('user', JSON.stringify(userInfo));

        // Context의 상태를 업데이트
        setUser(userInfo);

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
