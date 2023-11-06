import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To navigate to AllServices page
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Container, Button } from '@mui/material';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        setServices(response.data.slice(0, 4)); // Only take the first 4 services
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2" gutterBottom align="center">
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
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <Button variant="contained" onClick={() => navigate('/allservices')}>
          All Services
        </Button>
      </Grid>
    </Container>
  );
};

export default ServicesList;
