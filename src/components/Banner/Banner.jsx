import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box, CircularProgress } from '@mui/material';

const Banner = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Carousel
      autoPlay={true}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      sx={{ maxWidth: 'lg', margin: 'auto', mt: 4, mb: 4 }}
    >
      {services.map((service, i) => (
        <Paper key={i} elevation={0}>
          <Box
            sx={{
              position: 'relative',
              backgroundImage: `url(${service.serviceImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: 500,
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                width: '100%',
                textAlign: 'center',
                py: 2,
              }}
            >
              {service.serviceName}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Carousel>
  );
};

export default Banner;
