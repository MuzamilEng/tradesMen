import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './app/pages/Home'
import Login from './app/pages/Login'
import Signup from './app/pages/Signup'
import Profile from './app/pages/Profile'
import MapComponent from './app/Component/MapComponent'
import Tracker from './app/pages/Tracker'
import UserProfile from './app/Component/UserProfile'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/map' element={<MapComponent />} />
        <Route path='/tracker' element={<Tracker />} />
        <Route path='/user-profile/' element={<UserProfile />} />
      </Routes>
    </>
  )
}

export default App