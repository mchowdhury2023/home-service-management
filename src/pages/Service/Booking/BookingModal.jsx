import React, { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import { Snackbar, Alert } from '@mui/material';


const BookingModal = ({ open, onClose, service }) => {
  const { user } = useContext(AuthContext);
  const [bookingDate, setBookingDate] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();

    const bookingDetails = {
      serviceName: service.serviceName,
      serviceImage: service.serviceImage,
      serviceProviderEmail: service.providerEmail,
      userEmail: user.email,
      userName: user.displayName,
      serviceDate: bookingDate,
      specialInstructions: specialInstructions,
      price: service.servicePrice,
    };

    try {
      const response = await axios.post(
        "https://home-service-server-seven.vercel.app/bookings",
        bookingDetails
      );
      if (response.data.insertedId) {
        setSnackbarMessage('Booked successfully!');
        setOpenSnackbar(true);
        setBookingDate(""); 
        setSpecialInstructions(""); 
        onClose(); // Close the modal
      } 
    } catch (error) {
      console.error("Error booking service:", error);
      toast.error(`Error booking service: ${error.message}`);
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  return (
    <div>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book Service</DialogTitle>
      <DialogContent>
        <TextField
          value={service.serviceImage}
          label="Service Image"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          value={service.serviceName}
          label="Service Name"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          type="date"
          label=""
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Special Instructions"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          value={service.servicePrice}
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          value={service.providerEmail}
          label="Provider Email"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          value={user.email}
          label="Your Email"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleBooking} variant="contained">
          Purchase this Service
        </Button>
      </DialogActions>
    
      
    </Dialog>
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
    </div>
  );
};

export default BookingModal;
