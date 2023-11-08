import React, { useContext, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../../providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const BookingModal = ({ open, onClose, service }) => {
  const { user } = useContext(AuthContext);
  const [bookingDate, setBookingDate] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleBooking = async () => {

    const bookingDetails = {
      serviceName: service.serviceName,
      serviceImage: service.serviceImage,
      serviceProviderEmail: service.providerEmail,
      userEmail: user.email,
      userName:user.displayName,
      serviceDate: bookingDate,
      specialInstructions: specialInstructions,
      price: service.servicePrice,
    };

    try {
      const response = await axios.post(
        "https://home-service-server-seven.vercel.app/bookings",
        bookingDetails
      );
      if (response.data.success) {
        toast.success("Booking successful!");
        setBookingDate(""); 
        setSpecialInstructions(""); 
        onClose(); // Close the modal
      } else {
        
        toast.error("Booking failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error booking service:", error);
      toast.error(`Error booking service: ${error.message}`);
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
        <TextField
          value={service.serviceImage}
          label="Service Image"
          variant="outlined"
          fullWidth
          margin="dense"
          disabled
        />

        <TextField
          value={service.serviceName}
          label="Service Name"
          variant="outlined"
          fullWidth
          margin="dense"
          disabled
        />
     
        <TextField
          type="date"
          label=""
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
        <TextField
          value={service.servicePrice}
          label="Price"
          variant="outlined"
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          value={service.providerEmail}
          label="Provider Email"
          variant="outlined"
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          value={user.email}
          label="User Email"
          variant="outlined"
          fullWidth
          margin="dense"
          disabled
        />
        <Button onClick={handleBooking} variant="contained" sx={{ mt: 2 }}>
          Purchase this Service
        </Button>
      </Box>
      <ToastContainer />
    </Modal>
  );
};

export default BookingModal;
