import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({username: "", password: "", email: "", phoneNumber: null})
  const [content, setContent] = useState([]);
  
  return (
    <UserContext.Provider value={{ content, setContent, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
