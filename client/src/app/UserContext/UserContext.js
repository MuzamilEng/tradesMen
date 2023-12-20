import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({username: "", password: "", email: "", phoneNumber: null})
  const [content, setContent] = useState([]);
  const [tradesManProfile, setTradesManProfile] = useState({
    username: "",
    email: "",
    phoneNumber: null,
    occupation: "",
    hourlyRate: null,
    ratings: null,
    description: "",
    location: "",
    image: "" // Set image as an object
  })
  
  return (
    <UserContext.Provider value={{ content, setContent, userInfo, setUserInfo, tradesManProfile, setTradesManProfile }}>
      {children}
    </UserContext.Provider>
  );
};
