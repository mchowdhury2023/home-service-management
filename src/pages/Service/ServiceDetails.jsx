import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Grid, Button, Box, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import BookingModal from "./Booking/BookingModal";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
import loadingAnimation from "../../Animation/Animation - 1699345682365.json";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [providerServices, setProviderServices] = useState([]);



    const fetchServiceDetails = async (id) => {
      try {
        const response = await axios.get(`https://home-service-server-seven.vercel.app/services/${id}`);
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };
    
    useEffect(() => {
      fetchServiceDetails(id);
    }, [id]);
    
    const handleServiceClick = (serviceId) => {
      // Navigate to the new service's URL or update the state
      fetchServiceDetails(serviceId);
    };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviderServices = async () => {
      try {
        const response = await axios.get(`https://home-service-server-seven.vercel.app/manageservices?email=${service.providerEmail}`, {withCredentials:true});
        setProviderServices(response.data);
      } catch (error) {
        console.error('Error fetching provider services:', error);
      }
    };
  
    // Make sure to fetch provider services only when the service details are available
    if (service) {
      fetchProviderServices(service.providerEmail);
    }
  }, [service]);
  

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (!service) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
          <Typewriter
            words={[service.serviceName]}
            loop
            cursor
            cursorStyle="|"
          />
        </Typography>
        <Grid container spacing={2}>
          {/* Service Provider Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Provider Info</Typography>
            <img
              src={service.providerImage}
              alt={service.providerName}
              style={{
                width: "80%",
                borderRadius: "50%",
                objectFit: "cover",
                marginTop: "1rem",
              }}
            />
            <Typography><span style={{ fontWeight: 'bold' }}>Name: </span>{service.providerName}</Typography>
            <Typography><span style={{ fontWeight: 'bold' }}>Location: </span> {service.serviceArea}</Typography>
            <Typography><span style={{ fontWeight: 'bold' }}>About Provider: </span>
              {service.serviceProviderInfo || "No information available"}
            </Typography>
            
          </Grid>

          {/* Single Service Section */}
          <Grid item xs={12} md={6}>
            <img
              src={service.serviceImage}
              alt={service.serviceName}
              style={{ width: "100%" }}
            />
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
      {providerServices.length > 0 && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            Other Services by {service.providerName}
          </Typography>
          <Grid container spacing={2}>
            {providerServices.map((providerService) => (
              providerService._id !== service._id && ( // Exclude the current service
                <Grid item xs={12} sm={6} md={4} key={providerService._id}>
                  <Card onClick={() => handleServiceClick(providerService._id)} sx={{ cursor: 'pointer' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={providerService.serviceImage}
                      alt={providerService.serviceName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {providerService.serviceName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {providerService.serviceDescription}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            ))}
          </Grid>
        </Box>
      )}

{service && (
   <BookingModal
     open={openModal}
     onClose={handleCloseModal}
     service={service}
   />
)}
    </Container>
  );
};

export default ServiceDetails;
