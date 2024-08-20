import { AppBar } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import PostList from '../components/PostList'
const MainPage = () => {
  return (
    <div>
      <Navbar />
      <PostList />
    </div>
  )
}

export default MainPage
