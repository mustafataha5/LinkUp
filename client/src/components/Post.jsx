import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  Menu,
  MenuItem,
  CardMedia,
  CardActions,
  Box,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ReportIcon from '@mui/icons-material/Report';
import PostForm from './PostForm';

const Post = ({ post, userId, onDelete, onUpdate, errors }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [likes, setLikes] = useState(0);
  const [likedUser, setLikedUser] = useState([])
  const [isLiked,setIsLiked] = useState(false) ; 
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true) ; 
  useEffect(() => {
    setLoading(true) ; 
    getPostLikes()
    isLikedByUser()
  }, [liked]);

  const getPostLikes = async() => {
    
    await axios.get(`http://localhost:8000/api/likes/${post._id}`)
      .then(response => {
        console.log("likes", response.data.Like)
        // if (response.data && Array.isArray(response.data)) {
          setLikedUser(response.data.Like); // Set the number of likes
          setLikes(response.data.Like.length); // Set the number of likes
          setLoading(false) ;
        // }
      })
      .catch(error => {
        console.error('Error fetching likes:', error);
      });
  };

  const handleLike = () => {
    if (liked) {
      axios.delete('http://localhost:8000/api/likes/'+post._id+"/"+userId)
      .then(res => {
        console.log(res.data)
      })
      // If there is errors we set the errors equal to the err.response
      // And pass it as props to the form.
      .catch(err => {
        console.log(err.response.data.errors)
        // const errorResponse = err.response.data.errors;
        // setErrors(errorResponse);
      })
    } else {
      axios.post('http://localhost:8000/api/likes', { users_id:userId, posts_id:post._id })
        .then(res => {
          console.log(res.data)
        })
        // If there is errors we set the errors equal to the err.response
        // And pass it as props to the form.
        .catch(err => {
          console.log(err.response)
          // const errorResponse = err.response.data.errors;
          // setErrors(errorResponse);
        })
    }
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  }

  const isLikedByUser = () => {
    console.log("LikeUser",likedUser)
    console.log(likedUser.includes(userId))
    setLiked(likedUser.includes(userId));
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        { text: newComment, user: post.user.firstName + ' ' + post.user.lastName, userImage: post.user.imageUrl },
      ]);
      setNewComment('');
    }
  };

  const handleReport = () => {
    alert('Report feature coming soon!');
  };

  const handleDelete = () => {
    try {
      handleMenuClose();
      onDelete(post._id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true)
    console.log("inside edit", post._id)
    handleMenuClose();
  }

  const handleUpdate = (id, newData) => {
    console.log(">>>>>>>id" + id)
    console.log(newData)
    onUpdate(post._id, newData)
    setIsEditing(false)
  }

  if(loading){
    return (
      <div>loading ...</div>
    )
  }

  return (
    <Card sx={{ maxWidth: 500, margin: '20px auto' }}>
      <CardHeader
        avatar={<Avatar src={post.user.imageUrl} alt={post.user.firstName + post.user.lastName} />}
        action={
          <React.Fragment>
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {post.user._id === userId ? (
                [
                  <MenuItem key="edit" onClick={handleEdit}>Edit</MenuItem>,
                  <MenuItem key="delete" onClick={handleDelete}>Delete</MenuItem>
                ]
              ) : (
                <MenuItem onClick={handleReport}>
                  <ReportIcon sx={{ marginRight: 1 }} />
                  Report
                </MenuItem>
              )}
            </Menu>
          </React.Fragment>

        }
        title={post.user.firstName + ' ' + post.user.lastName}
        subheader={new Date(post.timestamp).toLocaleDateString()}
      />
      {isEditing ?
        <PostForm
          userId={userId}
          onPostSubmit={handleUpdate}
          errors={errors}
          userImage={post.user.imageUrl}
          name={post.user.firstName + " " + post.user.lastName}
          initialContent={post.content}
          initialImage={post.imageUrl}
          postId={post._id}
          isEdit={true}
        /> :

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </CardContent>
      }

      {post.imageUrl && (
        <CardMedia
          component="img"
          image={post.imageUrl}
          alt="Post image"
          sx={{ maxHeight: 300, objectFit: 'cover' }}
        />

      )}

      <CardActions disableSpacing>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <IconButton aria-label="like" onClick={handleLike}>
            <ThumbUpIcon color={liked ? 'primary' : 'action'} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {likes}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="comment" onClick={handleComment}>
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {comments.length}
          </Typography>
        </Box>
      </CardActions>

      {showComments && (
        <>
          <Divider />
          <CardContent>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={comment.userImage} alt={comment.user} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.user}
                    secondary={comment.text}
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
                sx={{ mt: 1 }}
              >
                Post
              </Button>
            </Box>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Post;
