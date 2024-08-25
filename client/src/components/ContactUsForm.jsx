import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ContactUsForm({ setAcknowledgmentMessage }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Dear ${formData.name},\n\nThank you for contacting us! We have received your message and are reviewing your inquiry. One of our team members will get back to you as soon as possible.\n\nThank you for your patience and for reaching out to us!\n\nBest regards,\nThe LinkUp Team`;
    
    setAcknowledgmentMessage(message);
    setFormData({ name: '', email: '', message: '' }); // Reset the form
    navigate('/contact/response');
  };

  return (
    <Container maxWidth="sm">
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
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
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          type="email"
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          fullWidth
          multiline
          rows={4}
        />
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ backgroundColor: 'orange', '&:hover': { backgroundColor: 'darkorange' } }}
        >
          Submit
        </Button>
      </Box>
    </Container>

    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
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
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            type="email"
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" sx={{ backgroundColor: 'orange' }}>
            Submit
          </Button>
        </Box>

        {acknowledgmentMessage && (
          <Box sx={{ mt: 4 }}>
            <Alert severity="success">
              <Typography variant="body1" component="p" whiteSpace="pre-line">
                {acknowledgmentMessage}
              </Typography>
            </Alert>
          </Box>
        )}
      </Container>
      <Footer />
    </div>

  );
}
export default ContactUsForm;

