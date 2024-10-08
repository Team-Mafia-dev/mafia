import React, { createContext, useState } from 'react';

// UserContext 생성
export const UserContext = createContext();

// user 정보 받아오는거 용환이한테 부탁하기
// UserProvider 생성
export const UserProvider = ({ children }) => {
  const profileImage = process.env.PUBLIC_URL + "/images/newbi.jpg";
  const [user, setUser] = useState({
    name: '감자모찌',
    profileImage: profileImage,
    winRate: 75,
    loseRate: 50,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
