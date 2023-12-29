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
        <Route path='/tradesmen' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/map' element={<MapComponent />} />
        <Route path='/tracker' element={<Tracker />} />
        <Route path='/profile/:id' element={<UserProfile />} />
      </Routes>
    </>
  )
}

// clientId = i6Emcp030e1VFxsV1ENnaY6XyOvCznaA
// client secret = rk4y3sJvx_YIE24g7IRcFDi6yp3Tg0EW0uU9dBeB15UP08qs9lxOHiY8WKMpqiJH

export default App