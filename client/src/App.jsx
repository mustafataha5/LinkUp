import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './views/Home'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Test from './components/Test'
// import FollowerSidebar from './views/FollowerSidebar';
import MainPage from './views/MainPage';
import Page403 from './components/Page403';
import FriendPage from './views/FriendPage';
// import AutoPlaySwipeableViews from './views/PhotoSlider';
import Ads from './components/Ads';

function App() {

  return (
    <>
      <Routes>
        <Route path='/randatest' element={<Ads />} />
        {/* <Route path='/randatest' element={<AutoPlaySwipeableViews />} /> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/test' element={<Test />} />
        <Route path='/people' element={<FriendPage />} />
        <Route path='/success' element={<MainPage />} />
        <Route path='/403' element={<Page403 />} />
      </Routes>
    </>
  )
}
export default App
