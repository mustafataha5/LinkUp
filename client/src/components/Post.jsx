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
import { Link } from 'react-router-dom';

const Post = ({ post, userId, onDelete, onUpdate, errors }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, setUser } = useContext(UserContext);

  const [numOfLikes, setNumOfLikes] = useState(0);

  const [likedUsers, setLikedUsers] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the likes for the post
        const response = await axios.get(`http://localhost:8000/api/likes/${post._id}`);

        // Update the number of likes and the list of users who liked the post
        const likedUsers = response.data.Like;
        setNumOfLikes(likedUsers.length);
        setLikedUsers(likedUsers);

        // Check if the current user has liked the post
        const userHasLiked = likedUsers.some(like => like.user === userId); // Check if userId exists in any like object
        setIsLiked(userHasLiked);

      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchData();
  }, [post._id, userId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Fetch the comments for the post
        const response = await axios.get(`http://localhost:8000/api/comments/${post._id}`);
        //console.log(post._id + "comments", response.data.comments);

        const data = response.data.comments;
        setComments(data);
      } catch (error) {
        console.error('Error fetching commnts:', error);
      }
    };
    fetchComments();
  }, [post._id]); // Comments change with change of post only (for users it will be same)

  // Function to handle clicking on like icon
  const handleLike = () => {
    // If user is already liked the post then he/she wants to dislike the post 
    if (isLiked) {
      axios.delete('http://localhost:8000/api/likes/' + post._id + "/" + userId)
        .then(res => {
          console.log(res.data)
        })
        // If there is errors we set the errors equal to the err.response
        // And pass it as props to the form.
        .catch(err => {
          console.log(err.response.data.errors)
        })
      // If the user didn't liked this post before then the user wants to add a like 
    } else {
      axios.post('http://localhost:8000/api/likes', { users_id: userId, posts_id: post._id })
        .then(res => {
          console.log(res.data)
        })
        // If there is errors we set the errors equal to the err.response
        // And pass it as props to the form.
        .catch(err => {
          console.log(err.response)
        })
    }
    // Update like count and color of the like button in the frontend
    setIsLiked(!isLiked);
    setNumOfLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Open or close comment section
  const handleComment = () => {
    setShowComments(!showComments);
  };

  // Handle clicking on add comment button 
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    // Send a post request to the server and send {content, postID, userID}
    axios.post('http://localhost:8000/api/comments', {
      content: newComment.trim(),
      postId: post._id,
      userId: user._id
    })
      .then(res => {
        const savedComment = res.data;
        // Update the comments on the frontend
        setComments(prev => [
          ...prev,
          {
            content: savedComment.content,
            // we will take the user information from context
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              imageUrl: user.imageUrl
            },
            _id: savedComment._id,
            timestamp: savedComment.timestamp
          }
        ]);
        // Clear the comment section to allow the user to add new one
        setNewComment('');
      })
      .catch(err => {
        console.error("Error saving comment:", err.response);
      });
  };

  const handleReport = () => {
    alert('Report feature coming soon!');
  };

  // Function to handle delete post option for owner of posts or admins
  const handleDelete = () => {
    try {
      handleMenuClose();  // First we need to close the drop down menu
      onDelete(post._id); // Send delete request to the server
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // To handle edit post option only for owner of posts
  const handleEdit = () => {
    setIsEditing(true)   // Set it to true to open the edit form section
    handleMenuClose();   // Also we need to close the drop down menu
  }

  // Handle clicking on edit button to update the post information 
  const handleUpdate = (id, newData) => {
    if (newData.content.length > 0) {
      onUpdate(id, newData)         // Send patch request to the server with the new data
      setIsEditing(false)          // To close the editing area
    }
  }

  return (
    <Card sx={{ maxWidth: 500, margin: '20px auto', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
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
              {/* This option will be for the post onwer or user with role admin  */}
              {post.user._id === userId ? (
                [
                  <MenuItem key="edit" onClick={handleEdit}>Edit</MenuItem>,
                  <MenuItem key="delete" onClick={handleDelete}>Delete</MenuItem>
                ]
              ) :
                // This option will be for the other users
                (
                  <MenuItem onClick={handleReport}>
                    <ReportIcon sx={{ marginRight: 1 }} />
                    Report
                  </MenuItem>
                )}
            </Menu>
          </React.Fragment>

        }
        // The header part of the post {user name, user image, date and time }
        title={
          <Typography
            variant="body1"
            component="div"
            style={{ flexGrow: 1, fontWeight: 'bold', color: 'black' }}
          >
            <Link
              to={`/profile/${user._id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                transition: 'color 0.3s'
              }}
              onMouseEnter={e => e.target.style.color = 'blue'}
              onMouseLeave={e => e.target.style.color = 'inherit'}
            >
              {post.user.firstName} {post.user.lastName}
            </Link>
          </Typography>
        }
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
      {/* Editing area */}
      {isEditing ?
        // If the user wants to update the post, display the edit form
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
        // If not just display the post information
        <CardContent>
          <Typography variant="body2" color="text.secondary" fontWeight="bold">
            {post.content}
          </Typography>
        </CardContent>
      }
      {/* Check if the post has an image or not */}
      {post.imageUrl && (
        <CardMedia
          component="img"
          image={post.imageUrl}
          alt="Post image"
          sx={{ maxHeight: 350, objectFit: 'cover', padding: 2, borderRadius: "25px" }}
        />

      )}
      {/* Interaction section {like and comment icons} */}
      <CardActions disableSpacing>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
          <IconButton aria-label="like" onClick={() => handleLike(post._id)}>
            <ThumbUpIcon sx={{ color: isLiked ? '#fe520a' : 'action' }} />
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

      {/* Comment area */}
      {showComments && (
        <>
          <Divider />
          <CardContent>
            <List>
              {/* Shoe all comments for this post, and each one will have user name, user image, comment, date and time */}
              {comments && comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={comment.user.imageUrl} alt={`${comment.user.firstName} ${comment.user.lastName}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${comment.user.firstName} ${comment.user.lastName}`}
                    secondary={
                      <>
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
                        <Typography variant="body2" color="text.primary">
                          {comment.content}
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
                onClick={handleAddComment}
                sx={{
                  mt: 1,
                  backgroundColor: '#fe520a',
                  '&:hover': {
                    backgroundColor: '#fe520a', // Maintain the same color on hover
                    boxShadow: 'none', // Remove any shadow effects on hover
                  },
                }}
              >
                Comment
              </Button>

            </Box>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default Post;