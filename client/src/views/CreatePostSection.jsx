import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import CreatePost from '../components/PostForm'

const CreatePostSection = () => {
    const [errors, setErrors] = useState([]);

    // This function is used to create an author
    const createPost = post => {
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
    <>
        <div className="container mt-5">
            <CreatePost onSubmit={createPost} errors={errors} userImage={""} name={""} />
        </div>
    </>
}

export default CreatePostSection