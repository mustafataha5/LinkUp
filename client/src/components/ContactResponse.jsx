import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';

function ContactResponse({ acknowledgmentMessage }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Thank You for Reaching Out!
          </Typography>
          <Typography variant="body1" component="p" whiteSpace="pre-line">
            {acknowledgmentMessage ? acknowledgmentMessage : "No message to display."}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default ContactResponse;
