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
import Room from "./pages/Room/Room";

import "./App.css";
import theme from "./styles/theme";
import { UserProvider } from 'context/userContext';
import { SystemProvider } from "context/systemContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <SystemProvider>
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
    </SystemProvider>
    </ThemeProvider>
  );
}

export default App;
