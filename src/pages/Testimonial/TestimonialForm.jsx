// TestimonialForm.jsx
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TextField, Button, Box, Typography } from '@mui/material';

const TestimonialForm = () => {
  const handleAddFeedback = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get('name');
    const review = form.get('review');
    
    const newFeedback = { name, review };

    try {
      const response = await axios.post('https://home-service-server-seven.vercel.app/testimonials', newFeedback);
      if (response.data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Your feedback has been submitted successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        e.target.reset();
      }
    } catch (error) {
      
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while submitting your feedback.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#F4F3F0' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        Submit Your Feedback
      </Typography>
      <Box component="form" onSubmit={handleAddFeedback} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Your Name"
          name="name"
          autoComplete="name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="review"
          label="Your Review"
          name="review"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: 'slategray' }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default TestimonialForm;
