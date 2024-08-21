import React, { useEffect, useState } from 'react';
import Post from './Post';

const PostList = ({ posts, userId, handleDelete, handleUpdate, errors }) => {
    return (
        <>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post._id}
                        post={post}
                        userId={userId}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        errors={errors}
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </>
    );
};

export default PostList;