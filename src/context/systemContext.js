import React, { createContext, useState } from 'react';

// SystemContext 생성
export const SystemContext = createContext();

// system 정보 받아오는거 용환스한테 부탁하기
// SystemProvider 생성
export const SystemProvider = ({ children }) => {
  const [dayAndNight, setDayAndNight] = useState(0); //0 낮 1 밤
  return (
    <SystemContext.Provider value={{ 
      dayAndNight,
      setDayAndNight
      }}>
      {children}
    </SystemContext.Provider>
  );
};
