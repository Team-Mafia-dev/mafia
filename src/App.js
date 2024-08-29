import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Signup/SignupPage";
import Robe from "./components/Robe/Robe";
import NotFound from "./components/NotFound";
import "./App.css";

// 로그인 절차 부터 로비 창 이동까지는 굳이 싱글페이지로 만들 필요 없다고 생각.
// 접속하면 로그인 창이 뜸 -> 로그인 성공하면 로비 창으로 이동

//회원가입 구현하면 됨
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Content />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/robe" element={<Robe />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
