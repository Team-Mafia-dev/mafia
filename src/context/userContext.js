import React, { createContext, useState } from 'react';

// UserContext 생성
export const UserContext = createContext();

// UserProvider 생성
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: "",
    profileImage: null,
    winRate: 0,
    loseRate: 0,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
