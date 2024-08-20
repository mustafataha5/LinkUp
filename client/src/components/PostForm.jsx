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

const PostForm = ({ userImage, name, onPostSubmit, errors }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (content.trim()) {
            onPostSubmit({ content, image });
            setContent('');
            setImage(null);
        }
    };

    return (
        <Card sx={{ maxWidth: 500, margin: '20px auto' }}>
            <CardHeader
                avatar={<Avatar src={userImage} alt="User" />}
                title="Current user"
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
                {image && (
                    <Box sx={{ mt: 2 }}>
                        <img src={image} alt="Selected" style={{ width: '100%' }} />
                    </Box>
                )}
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
