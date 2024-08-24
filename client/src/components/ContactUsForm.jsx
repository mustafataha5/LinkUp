import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';
import '../css/ContactUs.css'; 
import Footer from './Footer';

function ContactUsForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [acknowledgmentMessage, setAcknowledgmentMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setAcknowledgmentMessage(
      `Dear ${formData.name},\n\nThank you for contacting us! We have received your message and are reviewing your inquiry. One of our team members will get back to you as soon as possible.\n\nThank you for your patience and for reaching out to us!\n\nBest regards,\nThe LinkUp support team`
    );

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box className="main-content">
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Grid container spacing={4} justifyContent={acknowledgmentMessage ? "flex-start" : "center"}>
          <Grid item xs={12} md={acknowledgmentMessage ? 6 : 8} sx={{ marginBottom: 2}}>
            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: '#fff', p: 3, borderRadius: 2, boxShadow: 3 }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                Contact Us
              </Typography>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit
              </Button>
            </Box>
          </Grid>

          {acknowledgmentMessage && (
            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: '#f0f0f0', p: 4, borderRadius: 2, boxShadow: 2, height: '95%', marginBottom: 2 }}>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {acknowledgmentMessage}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

export default ContactUsForm;
