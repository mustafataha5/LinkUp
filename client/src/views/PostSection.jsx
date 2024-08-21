import {useState, useEffect} from 'react'
import axios from 'axios';
import PostList from '../components/PostList';

const PostSection = ({posts, user}) => {

  return (
    <PostList posts={posts} userId={user._id}/>
  )
}

export default PostSection