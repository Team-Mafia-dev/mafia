import React, { createContext, useState } from 'react';

// SystemContext 생성
export const playerListContext = createContext();

// system 정보 받아오는거 용환스한테 부탁하기
// SystemProvider 생성
export const PlayerListProvider = ({ children }) => {
  
  return (
    <playerListContext.Provider value={{}}>
      {children}
    </playerListContext.Provider>
  );
};
