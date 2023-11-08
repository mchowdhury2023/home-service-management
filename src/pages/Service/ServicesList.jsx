import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Container, Button, Box } from '@mui/material';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

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

  const truncateDescription = (desc, charLimit) => {
    return desc.length > charLimit ? desc.substring(0, charLimit) + '...' : desc;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2" gutterBottom align="center">
        Our Services
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {services.map((service) => (
          <Grid item key={service._id} xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea sx={{ flexGrow: 1 }} onClick={() => navigate(`/services/${service._id}`)}>
                <CardMedia
                  component="img"
                  sx={{ height: 140, objectFit: 'cover' }}
                  image={service.serviceImage || 'placeholder.jpg'}
                  alt={service.serviceName}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {service.serviceName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truncateDescription(service.serviceDescription, 100)}
                    {service.serviceDescription && service.serviceDescription.length > 100 && (
                      <span
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => navigate(`/service/${service._id}`)}
                      >
                        See details
                      </span>
                    )}
                  </Typography>
                  {/* Provider's Image */}
                  <CardMedia
                    component="img"
                    sx={{ height: 50, width: 50, borderRadius: '50%', mt: 2 }}
                    image={service.providerImage || 'provider_placeholder.jpg'} // Placeholder if no image is provided
                    alt={service.providerName}
                  />
                  <Typography variant="subtitle1" component="div" sx={{ mt: 1 }}>
                    Provider: {service.providerName}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                    Price: ${service.servicePrice}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button size="small" variant="contained" onClick={() => navigate(`/services/${service._id}`)}>
                  View Details
                </Button>
              </Box>
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
