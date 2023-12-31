import React, { createContext, useContext, useEffect, useState, useReducer } from 'react';
import { useGetAllTradesmenQuery } from '../store/storeApi';
import {useNavigate} from "react-router-dom"

const UserContext = createContext();
export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({firstName: "",image: "", lastName: "", password: "", email: "", phoneNumber: null, category: "",})
  const [content, setContent] = useState([]);
  const {data: tradesManProfiles} = useGetAllTradesmenQuery();
  const [tradesmanProfiles, setTradesmanProfiles] = useState([]);
  const [searchedLocation, setSearchedLocation] = useState(null)
  const [tradesmanProfileDetails, setTradesmanProfileDetails] = useState(null);
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
    image: "", 
      lat: "",
      lng: "",
  })

  // ----------------------------------------------------------------
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const navigate = useNavigate();
  const userLoginInfo =  localStorage.getItem('userLoginInfo')
  // console.log(userLoginInfo, 'userinfo');
  useEffect(() => {
    const userInfos = JSON.parse(localStorage.getItem("userLoginInfo"));
    setUser(userInfos);

    if (!userInfos) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // console.log(user, "user1234");

  // ----------------------------------------------------------------
  useEffect(() => {
    if(tradesManProfiles){
      setTradesmanProfiles(tradesManProfiles)
    }
  }, [tradesManProfiles])
  // console.log(tradesmanProfiles, "tradesmanProfiles");
  ;
  useEffect(()=> {
    setTradesmanProfileDetails(tradesmanProfileDetails)
  }, [tradesmanProfileDetails])
  // console.log(tradesmanProfileDetails, 'pr details');
  return (
    <UserContext.Provider value={{ content, userDetails, setUserDetails, setContent, userInfo, setUserInfo, tradesManProfile, setTradesManProfile, searchedLocation, setSearchedLocation,
    tradesmanProfiles, userLoginInfo, tradesmanProfileDetails, setTradesmanProfileDetails,
    selectedChat,
    setSelectedChat,
    user,
    setUser,
    notification,
    setNotification,
    chats,
    setChats, }}>
      {children}
    </UserContext.Provider>
  );
};
