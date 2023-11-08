import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditService = () => {
  const navigate = useNavigate();
  const service = useLoaderData();

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
        Swal.fire({
            title: 'Success!',
            text: 'Product updated Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          })
      }
    } catch (error) {
      console.error(error.message);
    }
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
  </Box>
  );
};

export default EditService;
