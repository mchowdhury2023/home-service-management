import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Container } from '@mui/material';

const ServicesList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from the backend
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        setServices(response.data); // Set the services in state
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Typography variant="h2" component="h2" gutterBottom align="center">
      Our Services
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      {services.map((service) => (
        <Grid item key={service._id} xs={12} sm={6} lg={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea sx={{ flexGrow: 1 }}>
              <CardMedia
                component="img"
                sx={{
                  // Set the height of the media
                  height: 200,
                  objectFit: 'cover',
                }}
                image={service.serviceImage || 'placeholder.jpg'} // Replace 'placeholder.jpg' with a default image if needed
                alt={service.serviceName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {service.serviceName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.serviceDescription}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);
};

export default ServicesList;
