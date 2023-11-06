import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const BookingModal = ({ open, onClose, service }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleBooking = async () => {
    // TODO: Get the user email from context or authentication state
    const userEmail = 'user@example.com';

    const bookingDetails = {
      serviceName: service.serviceName,
      serviceImage: service.serviceImage,
      serviceProviderEmail: service.providerEmail,
      userEmail: userEmail,
      serviceDate: bookingDate,
      specialInstructions: specialInstructions,
      price: service.servicePrice,
    };

    try {
      const response = await axios.post('http://localhost:5000/bookings', bookingDetails);
      console.log(response.data);
      // Handle success response
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error booking service:', error);
      // Handle error response
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="booking-modal-title"
      aria-describedby="booking-modal-description"
    >
      <Box sx={style}>
        <Typography id="booking-modal-title" variant="h6" component="h2">
          Book Service
        </Typography>
        {/* Service Details - Not Editable */}
        <TextField value={service.serviceName} label="Service Name" variant="outlined" fullWidth margin="dense" disabled />
        {/* ...add fields for Service Image and Provider Email similarly... */}
        {/* Editable Fields */}
        <TextField
          type="date"
          label="Service Taking Date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Special Instructions"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField value={service.servicePrice} label="Price" variant="outlined" fullWidth margin="dense" disabled />
        <Button onClick={handleBooking} variant="contained" sx={{ mt: 2 }}>
          Purchase this Service
        </Button>
      </Box>
    </Modal>
  );
};

export default BookingModal;
