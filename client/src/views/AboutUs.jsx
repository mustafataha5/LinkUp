import * as React from 'react';
import { Container, Grid, Typography, Card, CardContent, Box, Avatar, Divider, IconButton, Link } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';
import Footer from '../components/Footer';
import Muath from '../images/Muath.jpg';
import Mustafa from '../images/Mustafa.jpeg';
import Rand2 from '../images/Rand.jpg';
import Randa from '../images/Randa.png';

const teamMembers = [
    {
        name: 'Rand Farhoud',
        position: 'Full Stack Developer',
        githubUrl: 'https://github.com/Farhoud-Rand',
        linkedinUrl: 'https://www.linkedin.com/in/rand-farhoud-301b64184/',
        imageUrl: Rand2,
        shadowColor: 'rgb(138, 19, 180, 0.4)' // Yellow shadow for Rand
    },
    {
        name: 'Mustafa Taha',
        position: 'Full Stack Developer',
        githubUrl: 'https://github.com/mustafataha5',
        linkedinUrl: 'https://www.linkedin.com/in/mustafa-taha-3b87771b4/',
        imageUrl: Mustafa,
        shadowColor: 'rgba(0, 0, 255, 0.4)' // Blue shadow for Mustafa
    },
    {
        name: 'Randa Twasha',
        position: 'Full Stack Developer',
        githubUrl: 'https://github.com/rtawasha',
        linkedinUrl: 'https://www.linkedin.com/in/rtawasha/',
        imageUrl: Randa,
        shadowColor: 'rgb(11, 192, 174, 0.4)'
    },
    {
        name: 'Muath Ez Zughayyar',
        position: 'Full Stack Developer',
        githubUrl: 'https://github.com/Muath-Ademar',
        linkedinUrl: 'https://www.linkedin.com/in/muath-ez-zughayyar-b6b567277/',
        imageUrl: Muath,
        shadowColor: 'rgba(255, 0, 0, 0.4)' // Red shadow for Muath
    }
];

const AboutUsPage = () => {
    return (
        <div>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mt: 4, mb: 6 }}>
                    <Typography variant="h2" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4 }}>
                        At LinkUp, we're committed to revolutionizing the way people connect and share their lives. Meet the passionate team behind our social media platform.
                    </Typography>
                </Box>
                <Grid container spacing={4} justifyContent="center">
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                p: 2,
                                borderRadius: '16px',
                                boxShadow: `0px 4px 20px ${member.shadowColor}`, // Custom shadow color for each card
                                height: "300px", // Reduced height only
                                }}>
                                <Avatar
                                    alt={member.name}
                                    src={member.imageUrl}
                                    sx={{ width: 120, height: 120, mb: 2, border: '2px solid #ddd' }}
                                />
                                <CardContent sx={{ textAlign: 'center', p: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                        {member.position}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
                                        <Link href={member.githubUrl} target="_blank" rel="noopener">
                                            <IconButton aria-label="github" size="small">
                                                <GitHub sx={{ color: 'black' }} />
                                            </IconButton>
                                        </Link>
                                        <Link href={member.linkedinUrl} target="_blank" rel="noopener">
                                            <IconButton aria-label="linkedin" color="primary" size="small">
                                                <LinkedIn />
                                            </IconButton>
                                        </Link>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Divider sx={{ mb: 4 }} />
                </Box>
            </Container>
            <Footer />
        </div>
    );
};

export default AboutUsPage;
