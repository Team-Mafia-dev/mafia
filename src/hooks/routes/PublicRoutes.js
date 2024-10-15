import { FetchData } from "../../components/Util/FetchData";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PublicRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 세션 상태 관리
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ["/login", "/signup", "/"];

  // eslint-disable-next-line
  useEffect(() => {
    console.log(location.pathname);
    const checkSession = async () => {
      try {
        const result = await FetchData("auth/check-session");
        console.log("public");
        console.log(result.isSuccess);
        console.log(publicRoutes.includes(location.pathname));
        if (result.isSuccess && publicRoutes.includes(location.pathname)) {
          // 세션이 있는 상태에서 로그인, 회원가입 페이지로 접근 시 홈으로 리다이렉트
          navigate("/lobby");
        } else {
          setIsAuthenticated(false); // 세션이 없는 경우
        }
      } catch (error) {
        console.error("세션 확인 중 오류 발생:", error);
        //navigate("/lobby");
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

export default PublicRoutes;