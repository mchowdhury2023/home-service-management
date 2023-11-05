// Footer.js
import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.600', 
        color: 'white',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">ServiceApp</Typography>
            {/* You can also include a logo image here */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">
              &copy; {new Date().getFullYear()} ServiceApp. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">
              Follow us on:
              {/* Here you can include social media icons and links */}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
