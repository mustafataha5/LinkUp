import React from 'react'
import Post from './Post'
const PostList = () => {
    return (
        <>
            <Post
                username="John Doe"
                userImage="https://example.com/user-image.jpg"
                date="August 20, 2024"
                content="This is a sample post content."
            />

            <Post
                username="Jan Doe"
                userImage="https://example.com/user-image.jpg"
                date="August 20, 2024"
                content="This is another post with an image!"
                postImage="https://th.bing.com/th/id/OIP.Z_PIeIRDajXPmZHROt-T_QHaEK?rs=1&pid=ImgDetMain"
                isOwnPost={false}
            />

            <Post
                username="Jane Doe"
                userImage="https://example.com/user-image.jpg"
                date="August 20, 2024"
                content="This is a post with different options based on ownership!"
                postImage="https://example.com/post-image.jpg"
                isOwnPost={true}  // Set to true if the post belongs to the logged-in user
            />
        </>
    )
}

export default PostList