import React, { createContext, useContext, useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import {tracker} from '../Data'
import { useGetAllTradesmenQuery } from '../store/storeApi';

const initialState = tracker
const UserContext = createContext(initialState);


export const useGlobalContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const userReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE':
        const updatedState = state.map(item => 
          item.id === action.payload.id ? { ...item, ...action.payload.data } : item
        );
        console.log("Updated State:", updatedState); // Add this line
        return updatedState;
  
      case 'ADD':
        return [...state, action.payload];
  
      case 'DELETE':
        const remainingDate = state?.filter((data) => data.id !== action.payload);
        console.log(remainingDate, "remaining data");
        return remainingDate || [];
  
      default:
        return state;
    }
  };
  const [selectedData, setSelectedData] = useState(null);
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [record, setRecord] = useState([]);
  // console.log(state, "UserProvider ki statae");


  const selectData = (data) => {
    setSelectedData(data);
  }
  const updateData = (id, data) => {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  };

  const deleteData = (id) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };

  const addData = (data) => {
    const newId = state.length;  
    dispatch({ type: 'ADD', payload: { ...data, id: newId } });
    console.log(state, "add record");
  };
  
// console.log(state, 'state')
  // ------------
  const [userInfo, setUserInfo] = useState({firstName: "", lastName: "", password: "", email: "", phoneNumber: null, category: "",})
  const [content, setContent] = useState([]);
  const {data: tradesManProfiles} = useGetAllTradesmenQuery();
  const [tradesmanProfiles, setTradesmanProfiles] = useState([]);
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
    image: "", 
      lat: "",
      lng: "",
  })
  const userLoginInfo =  localStorage.getItem('userLoginInfo')
  // console.log(userLoginInfo, 'userinfo');

  useEffect(() => {
    if(tradesManProfiles){
      setTradesmanProfiles(tradesManProfiles)
    }
  }, [tradesManProfiles])
  console.log(tradesmanProfiles, "tradesmanProfiles");
  useEffect(() => {
    setRecord(state)
  }, [state]);
  return (
    <UserContext.Provider value={{ content, userDetails, setUserDetails, setContent, userInfo, setUserInfo, tradesManProfile, setTradesManProfile, searchedLocation, setSearchedLocation,
    addData, updateData, deleteData, setRecord, selectedData, setSelectedData, state, selectData, tradesmanProfiles, userLoginInfo }}>
      {children}
    </UserContext.Provider>
  );
};
