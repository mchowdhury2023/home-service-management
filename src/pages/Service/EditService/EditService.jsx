import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

import { Snackbar, Alert } from '@mui/material';

const EditService = () => {
  const navigate = useNavigate();
  const service = useLoaderData();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const { _id, serviceName, serviceImage, serviceArea, servicePrice, serviceDescription, providerEmail } = service;

  // Initialize formData with the loaded service data
  const [formData, setFormData] = useState({
    serviceName,
    serviceImage,
    serviceArea,
    servicePrice,
    serviceDescription,
    providerEmail,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://home-service-server-seven.vercel.app/services/${_id}`, formData);
      if (response.data.modifiedCount > 0) {
        setSnackbarMessage('Service updated successfully!');
        setOpenSnackbar(true);
      

      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    navigate('/my-services');
  };

  return (
    <Box sx={{ mt: 4 }}>
    <Typography variant="h4" gutterBottom>
      Edit Service
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="serviceName"
        label="Service Name"
        name="serviceName"
        autoFocus
        value={formData.serviceName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="serviceImage"
        label="Service Image URL"
        name="serviceImage"
        value={formData.serviceImage}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="serviceArea"
        label="Service Area"
        name="serviceArea"
        value={formData.serviceArea}
        onChange={handleChange}
      />
       <TextField
        margin="normal"
        required
        fullWidth
        id="providerEmail"
        label="Provider Email"
        name="providerEmail"
        value={formData.providerEmail}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="servicePrice"
        label="Service Price"
        name="servicePrice"
        value={formData.servicePrice}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="serviceDescription"
        label="Service Description"
        name="serviceDescription"
        multiline
        rows={4}
        value={formData.serviceDescription}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        
      >
        Update Service
      </Button>
    </Box>
    <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
  </Box>
  );
};

export default EditService;
