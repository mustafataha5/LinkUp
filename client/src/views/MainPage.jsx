import { AppBar } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import PostList from '../components/PostList'
import CreatePost from '../components/PostForm'
import FollowerSidebar from './FollowerSidebar'
import FollowerList from './FollowerList'


const MainPage = () => {
  const handlePostSubmit = (post) => {
    // Handle the submitted post here (e.g., send to API, update state)
    console.log('New post:', post);
  };
  return (
    <div>
      <Navbar />
    <FollowerList/>
      <CreatePost
        userImage="https://example.com/user-image.jpg"
        onPostSubmit={handlePostSubmit}
      />
      <PostList />
    </div>
  )
}

export default MainPage