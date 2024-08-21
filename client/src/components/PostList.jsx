import React, { useEffect, useState } from 'react';
import Post from './Post';

const PostList = ({ posts, userId }) => {
    return (
        <>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post._id}
                        username={post.user.firstName + post.user.lastName}  // Assuming the user object has a 'name' field
                        userImage={post.user.imageUrl}  // Fallback image
                        date={new Date(post.timestamp).toLocaleDateString()}
                        content={post.content}
                        postImage={post.imageUrl}
                        isOwnPost={post.user._id === userId}
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </>
    );
};

export default PostList;