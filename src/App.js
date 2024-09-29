import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Header from "./Header";
import Footer from "./Footer";
import Content from "./pages/Content";
import NotFound from "./pages/NotFound";

import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import Lobby from "./pages/Lobby/Lobby";
import Room from "./pages/Room";

import "./App.css";
import theme from "./styles/theme";
import {UserProvider} from 'context/userContext';

// 로그인 절차 부터 로비 창 이동까지는 굳이 싱글페이지로 만들 필요 없다고 생각.
// 접속하면 로그인 창이 뜸 -> 로그인 성공하면 로비 창으로 이동

//회원가입 구현하면 됨
function App() {
  return (
    <ThemeProvider theme={theme}>
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Content />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/lobby" element={<Lobby />}></Route>
            <Route path="/room/:nomberParams" element={<Room />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </UserProvider>
    </ThemeProvider>
  );
}

export default App;
