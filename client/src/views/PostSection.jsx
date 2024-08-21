import {useState, useEffect} from 'react'
import axios from 'axios';
import PostList from '../components/PostList';

const PostSection = ({user}) => {
  // State to hold the posts
  const [posts, setPosts] = useState([]);

  // Fetch the posts when the component is mounted
  useEffect(() => {
    getPosts()
  }, []);

  const getPosts = async () => {
    await axios.get('http://localhost:8000/api/posts')
    .then((response) => {
      console.log("Posts= ",response.data.posts)
      setPosts(response.data.posts); // Assuming the API returns { posts: [] }
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
  }

  return (
    <PostList posts={posts} userId={user._id}/>
  )
}

export default PostSection