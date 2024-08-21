import React from 'react'
import Header from '../components/Header'
import AuthorForm from '../components/AuthorForm'
import { useState } from 'react'
import axios from 'axios'
import PostForm from './components/PostForm'

const CreatePostSection = () => {
    const [errors, setErrors] = useState([]);

    // This function is used to create an post
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
    {/* userImage, name, onPostSubmit, errors */}
        <div className="container mt-5">
            <PostForm onSubmit={createPost} errors={errors} userImage={""} name={""} />
        </div>
    </>
}

export default CreatePostSection