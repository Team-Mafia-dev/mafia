import React, { createContext, useState } from 'react';

// UserContext 생성
export const UserContext = createContext();

// UserProvider 생성
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: "",
    profileImage: null,
    winCnt: 0,
    loseCnt: 0,
    resentRoom: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
