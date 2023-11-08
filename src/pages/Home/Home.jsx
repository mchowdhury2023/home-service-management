import React from 'react';
import Banner from '../../components/Banner/Banner';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Button
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ServicesList from '../Service/ServicesList';
import Testimonials from '../Testimonial/Testimonials';

const Home = () => {
  return (
    <div>
      <Banner />
      <ServicesList />
      
      <Box sx={{ py: 5, px: { xs: 2, sm: 3, md: 4 } }}>
        <Container>
          <Typography variant="h3" gutterBottom textAlign="center">
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            We are a team of dedicated professionals committed to providing top-notch home services. With years of experience and a passion for excellence, we ensure your home needs are met with the utmost care and expertise.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Our mission is to revolutionize the home services industry by providing an unparalleled service experience that guarantees satisfaction and value to our customers.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={4} sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    Our Values
                  </Typography>
                  <List>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Integrity and Honesty" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Dedication to Excellence" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Commitment to Innovation" />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Focus on Sustainable Practices" />
                    </ListItem>
                  </List>
                </Box>
              </Paper>
            </Grid>
          </Grid>
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
      <Testimonials />
    </div>
  );
};

export default Home;
