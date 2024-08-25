import * as React from 'react';
import { Container, Grid, Typography, Card, CardContent, Box, Avatar, Divider } from '@mui/material';
import Footer from '../components/Footer';
import Muath from '../images/Muath.jpg'
import Mustafa from '../images/Mustafa.jpeg'

const teamMembers = [
    {
        name: 'Rand Farhoud',
        position: 'Full Stack Developer',
        description: `A junior full stack developer seeking an entry-level web development role, eager to refine software engineering skills and apply logical thinking to craft innovative website solutions`,
        imageUrl: '/path/to/john-doe.jpg'
    },
    {
        name: 'Mustafa Taha',
        position: 'Full Stack Developer',
        description: `

I'm a full stack developer with expertise in Python and JavaScript, passionate about solving complex problems and delivering innovative, impactful projects.` ,
        imageUrl: Mustafa
    },
    {
        name: 'Randa Twasha',
        position: 'Full Stack Developer',
        description: 'Alice is responsible for product development, focusing on creating features that enhance user engagement and make our platform user-friendly and effective.',
        imageUrl: '/path/to/alice-johnson.jpg'
    },
    {
        name: 'Muath Ez Zughayyar',
        position: 'Full Stack Developer',
        description: `I'm a Junior Full Stack Developer with a Business Administration background and expertise in Java, Python, and MERN from an intensive 14-week bootcamp.`,
        imageUrl: Muath
    }
];

const AboutUsPage = () => {
    return (
        <div>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mt: 8, mb: 6 }}>
                    <Typography variant="h2" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4 }}>
                        At LinkUp, we're committed to revolutionizing the way people connect and share their lives. Meet the passionate team behind our social media platform.
                    </Typography>
                </Box>
                <Grid container spacing={4} justifyContent="center">
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ display: 'flex',
                                 flexDirection: 'column',
                                  alignItems: 'center',
                                   p: 2,
                                    borderRadius: '16px',
                                     boxShadow: 3,
                                     height:"400px" 
                                     }}>
                                <Avatar
                                    alt={member.name}
                                    src={member.imageUrl}
                                    sx={{ width: 120, height: 120, mb: 2, border: '3px solid #ddd' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                        {member.position}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {member.description}
                                    </Typography>
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
