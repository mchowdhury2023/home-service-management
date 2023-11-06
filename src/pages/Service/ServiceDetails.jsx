import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Modal, 
  Box, 
  TextField 
} from '@mui/material';
import BookingModal from './Booking/BookingModal';

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Fetch the service details from the backend using the ID
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/services/${id}`);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (!service) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>
        {service.serviceName}
      </Typography>
      <Grid container spacing={2}>
        {/* Service Provider Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Provider Info</Typography>
          <Typography>{service.providerName}</Typography>
          <Typography>{service.providerLocation}</Typography>
          <Typography>{service.providerDescription}</Typography>
        </Grid>
        {/* Single Service Section */}
        <Grid item xs={12} md={6}>
          <img src={service.serviceImage} alt={service.serviceName} style={{ width: '100%' }} />
          <Typography variant="h5">{service.serviceName}</Typography>
          <Typography>{service.serviceDescription}</Typography>
          <Typography>{service.providerName}</Typography>
          <Typography>{service.servicePrice}</Typography>
          <Button variant="contained" onClick={handleOpenModal}>
            Book Now
          </Button>
        </Grid>
      </Grid>

      <BookingModal 
        open={openModal} 
        onClose={handleCloseModal} 
        service={service}
      />
    </Container>
  );
};

export default ServiceDetails;
