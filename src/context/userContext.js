import React, { createContext, useState } from 'react';

// UserContext 생성
export const UserContext = createContext();

// UserProvider 생성
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '감자모찌',
    profileImage: "",
    winRate: 75,
    loseRate: 50,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
