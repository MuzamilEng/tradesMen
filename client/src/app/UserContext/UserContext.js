import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [content, setContent] = useState([]);
  
  return (
    <UserContext.Provider value={{ content, setContent }}>
      {children}
    </UserContext.Provider>
  );
};
