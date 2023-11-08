import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from "sweetalert2";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceImage: '',
    serviceArea: '',
    servicePrice: '',
    serviceDescription: '',
    serviceProviderInfo:'',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const providerData = {
        ...formData,
        providerName: user.displayName || 'Anonymous',
        providerImage: user.photoURL || 'NO Image',
        providerEmail:user.email
      };
      // Your API endpoint here
      const response = await axios.post('http://localhost:5000/addServices', providerData);
      if (response.data.insertedId) {
        setSuccess(true);
        Swal.fire({
            title: 'Success!',
            text: 'Service added Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          })
      }
    } catch (error) {
      // Handle error
      setError(err.message);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add a New Service
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
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="serviceImage"
          label="Service Image URL"
          name="serviceImage"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="serviceArea"
          label="Service Area"
          name="serviceArea"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="servicePrice"
          label="Service Price"
          name="servicePrice"
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
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="serviceProviderInfo"
          label="Tell Us About You"
          name="serviceProviderInfo"
          multiline
          rows={2}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Service
        </Button>
      </Box>
    </Box>
  );
};

export default AddService;
