import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 
import logo from '../../assets/homeservice-logo.png'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.600', 
        color: 'white',
        py: 2
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center">
              <img src={logo} alt="ServiceApp Logo" style={{ height: '70px', marginRight: '10px' }} />
              <Typography variant="h6">
                HomeScape Heroes <br/> Home Service
              </Typography>
            </Box>
            {/* Logo and text aligned to left */}
          </Grid>
          
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="flex-end">
  <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
    Follow us on:
  </Typography>
  {/* Social media links aligned to right */}
  <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mb: 2 }}>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
  </Box>
  {/* Feedback Button below social icons */}
  <Button
  color="inherit"
  component={Link}
  to="/testimonials"
  sx={{
    mt: 1,
    backgroundColor: 'lightblue', // set the background color to light blue
    '&:hover': {
      backgroundColor: 'blue', // optional: change the color slightly on hover for better user experience
    },
    color: 'white', // change the text color to white for better contrast
  }}
>
  Feedback
</Button>
</Grid>

        </Grid>
        <Typography variant="caption" display="block" align="center" sx={{ mt: 2 }}>
          &copy; {new Date().getFullYear()} ServiceApp. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
