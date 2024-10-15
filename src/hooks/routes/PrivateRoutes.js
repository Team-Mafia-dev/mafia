import { FetchData } from "../../components/Util/FetchData";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 세션 상태 관리
  const navigate = useNavigate();
  const location = useLocation();
  
  // 제외할 경로들
  const publicRoutes = ["/login", "/signup", "/"];

  // eslint-disable-next-line
  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await FetchData("auth/check-session");
        console.log("private");
        console.log(result.isSuccess);
        console.log(!publicRoutes.includes(location.pathname));
        if (!result.isSuccess && !publicRoutes.includes(location.pathname)) {
          // 세션이 없고, publicRoutes에 없는 경로로 접근하면 홈으로 리다이렉트
          alert("세션이 만료되었습니다.");
          navigate("/");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("세션 확인 중 오류 발생:", error);
        navigate("/");
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    // 세션 확인 중일 때 로딩 표시
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default PrivateRoutes