import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { AuthContext } from '../../providers/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

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
      //API endpoint here
      const response = await axios.post('https://home-service-server-seven.vercel.app/addServices', providerData, {withCredentials:true});
      if (response.data.insertedId) {
        setSuccess(true);
        toast.success('Service added Successfully');
        setFormData({
          serviceName: '',
          serviceImage: '',
          serviceArea: '',
          servicePrice: '',
          serviceDescription: '',
          serviceProviderInfo: '',
        });
      }
    } catch (error) {
      // Handle error
      setError(err.message);
      toast.error(error.message);
      setFormData({
        serviceName: '',
        serviceImage: '',
        serviceArea: '',
        servicePrice: '',
        serviceDescription: '',
        serviceProviderInfo: '',
      });
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // This centers your form horizontally
        }}
      >
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
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="serviceImage"
          label="Service Image URL"
          name="serviceImage"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="serviceArea"
          label="Service Area"
          name="serviceArea"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="servicePrice"
          label="Service Price"
          name="servicePrice"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="serviceDescription"
          label="Service Description"
          name="serviceDescription"
          multiline
          rows={2}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
         <TextField
          margin="normal"
          fullWidth
          id="providerName"
          label="Provider Name"
          name="providerName"
          value={user.displayName || 'Anonymous'}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          id="providerEmail"
          label="Provider Email"
          name="providerEmail"
          value={user.email}
          InputLabelProps={{ shrink: true }}
          disabled
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
          InputLabelProps={{ shrink: true }}
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
      <ToastContainer />
    </Container>
  
  );
};

export default AddService;
