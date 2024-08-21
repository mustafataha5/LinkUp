import React from 'react';
import { Avatar, Card, CardHeader, CardContent, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Post = ({ username, userImage, date, content, postImage, isOwnPost }) => {
    return (
        <Card sx={{ maxWidth: 500, margin: '20px auto' }}>
            <CardHeader
                avatar={<Avatar src={userImage} alt={username || 'User'} />}  // Make sure alt is a string
                action={
                    isOwnPost && (
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    )
                }
                title={username}
                subheader={date}
            />
            <CardContent>
                <Typography variant="body1">
                    {content}
                </Typography>
                {postImage && <img src={postImage} alt="Post content" style={{ width: '100%', marginTop: '10px' }} />}
            </CardContent>
        </Card>
    );
};

export default Post;
