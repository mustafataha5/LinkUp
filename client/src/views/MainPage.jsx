import { AppBar } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import FollowerSidebar from './FollowerSidebar'
import FollowerList from './FollowerList'

const MainPage = () => {
  return (
    <div>
    <Navbar/>
      <FollowerList/>
    </div>
  )
}

export default MainPage
