import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({firstName: "", lastName: "", password: "", email: "", phoneNumber: null, category: "",})
  const [content, setContent] = useState([]);
  const [searchedLocation, setSearchedLocation] = useState(null)
  const [userDetails, setUserDetails] = useState({firstName: "", lastName: "", password: "", email: "", phoneNumber: null, category: "",});
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
  const userLoginInfo =  localStorage.getItem('userLoginInfo')
  console.log(userLoginInfo, 'userinfo');
  return (
    <UserContext.Provider value={{ content, userDetails, setUserDetails, setContent, userInfo, setUserInfo, tradesManProfile, setTradesManProfile, searchedLocation, setSearchedLocation }}>
      {children}
    </UserContext.Provider>
  );
};
