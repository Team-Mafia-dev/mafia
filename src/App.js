import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { CookiesProvider } from 'react-cookie';

import Header from "./Header";
import Footer from "./Footer";
import Content from "./pages/Content";
import NotFound from "./pages/NotFound";

import SignupPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import Lobby from "./pages/Lobby/Lobby";
import Room from "./pages/Room/Room";

import "./App.css";
import theme from "./styles/theme";
import { UserProvider } from 'context/userContext';
import { SystemProvider } from "context/systemContext";
import PublicRoutes from "hooks/routes/PublicRoutes";
import PrivateRoutes from "hooks/routes/PrivateRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CookiesProvider>
      <SystemProvider>
      <UserProvider>
        <div className="App">
          <BrowserRouter>
            <Header />
            <Routes>
              {/* Public Routes - 세션이 있을 경우 로비로 리다이렉트 */}
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<Content />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Route>

              {/* Private Routes - 세션이 없을 경우 홈으로 리다이렉트 */}
              <Route element={<PrivateRoutes />}>
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/room/:numberParams" element={<Room />} />
              </Route>

              {/* 404 페이지 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </UserProvider>
      </SystemProvider>
    </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
