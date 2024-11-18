import React, { createContext, useState } from 'react';

export const PlayerListContext = createContext();

export const PlayerListProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState({
    "msg":null,
    "playerNoInfos":[{
      "playerNo":0,
      "playerName":""
    }]
  }
  );
  
  return (
    <PlayerListContext.Provider value={{playerList, setPlayerList}}>
      {children}
    </PlayerListContext.Provider>
  );
};
