import React, { useState } from 'react';
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

const Post = ({ username, userImage, date, content, postImage, isOwnPost }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([
    // Example comments with user info
    { text: 'Great post!', user: 'Alice', userImage: 'https://example.com/alice.jpg' },
    { text: 'Thanks for sharing!', user: 'Bob', userImage: 'https://example.com/bob.jpg' },
  ]);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        { text: newComment, user: 'Current User', userImage: 'https://example.com/current-user.jpg' },
      ]);
      setNewComment('');
    }
  };

  const handleReport = () => {
    // Implement the report functionality here
    alert('Report feature coming soon!');
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '20px auto' }}>
      <CardHeader
        avatar={<Avatar src={userImage} alt={username} />}
        action={
          <>
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
              {isOwnPost ? (
                <>
                  <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                </>
              ) : (
                <MenuItem onClick={handleReport}>
                  <ReportIcon sx={{ marginRight: 1 }} />
                  Report
                </MenuItem>
              )}
            </Menu>
          </>
        }
        title={username}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>

      {/* Conditionally render the post image */}
      {postImage && (
        <CardMedia
          component="img"
          image={postImage}
          alt="Post image"
          sx={{ maxHeight: 300, objectFit: 'cover' }}
        />
      )}

      {/* Card actions for likes and comments */}
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

      {/* Comments Section */}
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