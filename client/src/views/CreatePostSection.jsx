import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import PostForm from '../components/PostForm'
import { useNavigate } from 'react-router-dom'

const CreatePostSection = ({ user, getPosts }) => {

    // To handle form errors
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate() ;
    // This function is used to create an post
    const createPost = post => {
        console.log("post info", post)
        axios.post('http://localhost:8000/api/posts', post, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                getPosts()
            })
            // If there is errors we set the errors equal to the err.response
            // And pass it as props to the form.
            .catch(err => {
                // Handle different status codes
                if (err.response.status === 401) {
                    //setError('Unauthorized: Please log in.');
                    navigate('/401'); // Redirect to login
                } else if (err.response.status === 403) {
                    //setError('Access Denied: Your account is deactivated.');
                    navigate('/403'); // Redirect to a 403 Forbidden page
                }
                console.log("create err ======",err.response)
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