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
import { UserContext } from '../context/UserContext';

const Post = ({ post, userId, onDelete, onUpdate, errors }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, setUser } = useContext(UserContext);

  const [numOfLikes, setNumOfLikes] = useState(0);

  const [likedUsers, setLikedUsers] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const [comments, setComments] = useState([]);
  // const [numOfComments, setNumOfComments] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // Fetch the likes for the post
        const response = await axios.get(`http://localhost:8000/api/likes/${post._id}`);
        // console.log(post._id + "-----likes", response.data.Like);

        // Update the number of likes and the list of users who liked the post
        const likedUsers = response.data.Like;
        setNumOfLikes(likedUsers.length);
        setLikedUsers(likedUsers);

        // Check if the current user has liked the post
        // console.log("LikeUser", likedUsers);
        // console.log("userID", userId);
        const userHasLiked = likedUsers.some(like => like.user === userId); // Check if userId exists in any like object
        // console.log(userHasLiked);
        setIsLiked(userHasLiked);

      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchData();
  }, [post._id, userId]);

  useEffect(() => {
    // api/comments/:postId
    const fetchComments = async () => {
      try {
        // Fetch the likes for the post
        const response = await axios.get(`http://localhost:8000/api/comments/${post._id}`);
        console.log(post._id + "comments", response.data.comments);

        // Update the number of likes and the list of users who liked the post
        const data = response.data.comments;
        // setNumOfComments(data.length);
        setComments(data);
      } catch (error) {
        console.error('Error fetching commnts:', error);
      }
    };
    fetchComments();
  }, [post._id]);

  const handleLike = () => {
    if (isLiked) {
      axios.delete('http://localhost:8000/api/likes/' + post._id + "/" + userId)
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
      axios.post('http://localhost:8000/api/likes', { users_id: userId, posts_id: post._id })
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
    setIsLiked(!isLiked);
    setNumOfLikes((prev) => (isLiked ? prev - 1 : prev + 1));
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
    if (!newComment.trim()) return;
  
    axios.post('http://localhost:8000/api/comments', {
      content: newComment.trim(),
      postId: post._id,
      userId: user._id
    })
    .then(res => {
      const savedComment = res.data; // Ensure this contains populated user info
      setComments(prev => [
        ...prev,
        {
          content: savedComment.content,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl
          },
          _id: savedComment._id,
          timestamp: savedComment.timestamp
        }
      ]);
      setNewComment('');
    })
    .catch(err => {
      console.error("Error saving comment:", err.response || err.message);
    });
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
        subheader={new Date(post.timestamp).toLocaleString('en-US', {
          year: 'numeric', // e.g., '2024'
          month: 'long', // e.g., 'August'
          day: 'numeric', // e.g., '22'
          hour: '2-digit', // e.g., '3 PM'
          minute: '2-digit', // e.g., '30'
          second: '2-digit', // e.g., '45'
          hour12: true // Use 12-hour time format (AM/PM)
        })}
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
          <IconButton aria-label="like" onClick={() => handleLike(post._id)}>
            <ThumbUpIcon color={isLiked ? 'primary' : 'action'} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {numOfLikes}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="comment" onClick={handleComment}>
            <CommentIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {comments ? comments.length : 0}
          </Typography>
        </Box>
      </CardActions>

      {showComments && (
  <>
    <Divider />
    <CardContent>
      <List>
        {comments && comments.map((comment, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              {/* Make sure you access the image URL from the user object */}
              <Avatar src={comment.user.imageUrl} alt={`${comment.user.firstName} ${comment.user.lastName}`} />
            </ListItemAvatar>
            <ListItemText
              primary={`${comment.user.firstName} ${comment.user.lastName}`}
              secondary={
                <>
                  <Typography variant="body2" color="text.primary">
                    {comment.content}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(comment.timestamp).toLocaleString('en-US', {
                      year: 'numeric', // e.g., '2024'
                      month: 'long', // e.g., 'August'
                      day: 'numeric', // e.g., '22'
                      hour: '2-digit', // e.g., '3 PM'
                      minute: '2-digit', // e.g., '30'
                      hour12: true // Use 12-hour time format (AM/PM)
                    })}
                  </Typography>
                </>
              }
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