import React from 'react'
import Banner from '../../components/Banner/Banner'
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import ServicesList from '../Service/ServicesList'
import Testimonials from '../Testimonial/Testimonials'

const Home = () => {
  return (
    <div>
    
      <Banner />
      <ServicesList></ServicesList>
      <Testimonials></Testimonials>
      <Box sx={{ py: 5, px: { xs: 2, sm: 3, md: 4 } }}>
        <Container>
          <Typography variant="h3" gutterBottom textAlign="center">
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            We are a team of dedicated professionals committed to providing top-notch home services. With years of experience and a passion for excellence, we ensure your home needs are met with the utmost care and expertise.
          </Typography>
          {/* You can add more content or images as needed */}
        </Container>
      </Box>
      <Box sx={{ backgroundColor: '#f8f8f8', py: 5, px: { xs: 2, sm: 3, md: 4 } }}>
        <Container>
          <Typography variant="h3" gutterBottom textAlign="center">
            Contact Us
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Your Name" variant="outlined" margin="normal" />
              <TextField fullWidth label="Your Email" variant="outlined" margin="normal" />
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
              />
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
  
    </div>
  )
}

export default Home