import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import PostForm from '../components/PostForm'

const CreatePostSection = ({ user }) => {
    // To handle form errors
    const [errors, setErrors] = useState([]);

    // This function is used to create an post
    const createPost = post => {
        console.log("post info", post)
        axios.post('http://localhost:8000/api/posts', post)
            .then(res => {
                console.log(res.data)
            })
            // If there is errors we set the errors equal to the err.response
            // And pass it as props to the form.
            .catch(err => {
                console.log(err.response.data.errors)
                const errorResponse = err.response.data.errors;
                setErrors(errorResponse);
            })
    }
    return (
        <>
            <div className="container mt-5">
                <PostForm userId={user._id} onPostSubmit={createPost} errors={errors} userImage={user.imageUrl} name={user.firstName + " " + user.lastName} initialContent='' initialImage={null} />
            </div>
        </>
    )
}

export default CreatePostSection