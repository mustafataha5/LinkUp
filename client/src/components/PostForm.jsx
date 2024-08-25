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
import { Link } from 'react-router-dom';

const PostForm = ({postId,
     userId, 
     userImage,
      name,
       onPostSubmit, 
       errors,
        initialContent = '', initialImage = null, isEdit = false, setNewPost }) => {
  const [content, setContent] = useState(initialContent);
  const [imageUrl, setImageURL] = useState(initialImage);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if(imageUrl.length >1 && content.length < 1){
      setContent('.') ;
    }
  
    if (isEdit){
        console.log('-------**********************************')
        console.log(content, '---------------',imageUrl)
        onPostSubmit(postId,{ content, imageUrl })
    }
    else{

        onPostSubmit({ user: userId, content, imageUrl });
    }
    if (Object.keys(errors).length === 0) {
      setContent('');
      setImageURL(null);
      toast.success(`${isEdit ? 'Post updated' : 'Post submitted'} successfully!`, {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };
console.log("errors=====================",errors)
  return (
    <Card sx={{ maxWidth: 500, margin: '20px auto', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}>
      
      <CardHeader
        avatar={<Avatar src={userImage} alt="User" />}
        title={<Typography variant="h6" sx={{ fontWeight: 'bold' }}><Link style={{textDecoration:"none"}} to={`/profile/${userId}`}>{name}</Link></Typography>}
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
        {/* {errors.content && <small className="text-danger">{errors.content.message}</small>} */}

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
              <PhotoCamera sx={{color: '#fe520a'}} />
            </IconButton>
          </label>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Add an image (optional)
          </Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{backgroundColor:'#fe520a'}}onClick={handleSubmit}>
            {isEdit ? 'Update' : 'Post'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostForm;
