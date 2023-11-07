import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import BookingModal from './Booking/BookingModal';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Lottie from 'lottie-react';
import loadingAnimation from '../../Animation/Animation - 1699345682365.json'

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
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
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Lottie animationData={loadingAnimation} loop={true} />
      </Box>
    );
  }

  // Framer-motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Typography variant="h3" gutterBottom>
          <Typewriter words={[service.serviceName]} loop cursor cursorStyle='|' />
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
      </motion.div>

      <BookingModal
        open={openModal}
        onClose={handleCloseModal}
        service={service}
      />
    </Container>
  );
};

export default ServiceDetails;
