import { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import Swal from 'sweetalert2';

const PostSection = ({ posts, user, handleDeletePost, setPosts }) => {
  const handleDelete = async (postId) => {
    try {
      // Show SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });
  
      // Log result for debugging
      console.log("SweetAlert result:", result);
  
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:8000/api/posts/${postId}`);
        // Remove post from frontend
        setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
      } else if (result.isDismissed) {
        console.log('Deletion cancelled');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      Swal.fire('Error!', 'There was an error deleting the post.', 'error');
    }
  };
  
  return (
    <PostList posts={posts} userId={user._id} handleDelete={handleDelete} />
  );
};

export default PostSection;
