import * as React from 'react';
import { Container, Grid, Typography, Card, CardContent, Box } from '@mui/material';
import { Chat, PostAdd, People, ThumbUp, SmartToy } from '@mui/icons-material';
import Footer from '../components/Footer';

const services = [
    {
        title: 'Post Content',
        description: 'Share your thoughts, photos, and videos with the community. Express yourself and let others discover your content.',
        icon: <PostAdd sx={{ fontSize: 60, color: '#fe520a' }} />
    },
    {
        title: 'Engage with Posts',
        description: 'Like, comment, and share posts from others in the community. Engage in meaningful conversations and build connections.',
        icon: <ThumbUp sx={{ fontSize: 60, color: '#fe520a' }} />
    },
    {
        title: 'Chat with Others',
        description: 'Connect with people through our chat feature. Send messages, start conversations, and build relationships.',
        icon: <Chat sx={{ fontSize: 60, color: '#fe520a' }} />
    },
    {
        title: 'Follow People',
        description: 'Stay updated with the latest posts and activities from the people you follow. Create your own social network.',
        icon: <People sx={{ fontSize: 60, color: '#fe520a' }} />
    },
    {
        title: 'Future AI Features',
        description: 'We’re working on integrating AI to enhance your experience. Stay tuned for smarter content recommendations, automated moderation, and more.',
        icon: <SmartToy sx={{ fontSize: 60, color: '#fe520a' }} />
    }
];

const ServicesPage = () => {
    return (
        <div>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mt: 8, mb: 6 }}>
                    <Typography variant="h2" gutterBottom>
                        Our Services
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4 }}>
                        Discover the key features that make our platform unique and how we’re planning to innovate in the future.
                    </Typography>
                </Box>
                <Grid container spacing={4} justifyContent="center">
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, borderRadius: '16px', boxShadow: 3 }}>
                                <Box sx={{ mb: 2 }}>
                                    {service.icon}
                                </Box>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer/>
        </div>
    );
};

export default ServicesPage;
