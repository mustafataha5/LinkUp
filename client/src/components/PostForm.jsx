import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    Typography,
    IconButton,
    Input,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostForm = ({ userId, userImage, name, onPostSubmit, errors, initialContent, initialImage }) => {
    // Input of the form
    const [content, setContent] = useState(initialContent);
    const [imageUrl, setImageURL] = useState(initialImage);

    // This function handle changing in content
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    // This function handle changing in imageUrl
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageURL(URL.createObjectURL(file));
        }
    };

    // This function handle form submition
    const handleSubmit = () => {
        onPostSubmit({ user: userId, content, imageUrl })
        // Check if ther is no error empty the inputs 
        if (Object.keys(errors).length === 0) {
            setContent("");
            setImageURL(null);

            // Corrected toast notification without toast.POSITION
            toast.success('🎉 Your post has been submitted successfully!', {
                position: 'top-center', // Use 'top-center' as a string
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <Card sx={{ maxWidth: 500, margin: '20px auto' }}>
            <CardHeader
                avatar={<Avatar src={userImage} alt="User" />}
                title={name}
            />
            <CardContent>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="What's on your mind?"
                    value={content}
                    onChange={handleContentChange}
                />
                {errors.content && <small className="text-danger">{errors.content.message}</small>}

                {imageUrl && (
                    <Box sx={{ mt: 2 }}>
                        <img src={imageUrl} alt="Selected" style={{ width: '100%' }} />
                    </Box>
                )}
                {errors.image && <small className="text-danger">{errors.image.message}</small>}
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <Input
                        accept="image/*"
                        id="upload-image"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="upload-image">
                        <IconButton color="primary" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <Typography variant="body2" sx={{ ml: 2 }}>
                        Add an image (optional)
                    </Typography>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Post
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostForm;