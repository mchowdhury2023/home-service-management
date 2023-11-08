// AllServices.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  TextField,
  Box,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [displayServices, setDisplayServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadAll, setLoadAll] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/services");
        setServices(response.data);
        setDisplayServices(response.data.slice(0, 6)); // Load first 10 initially
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Filter services based on search term
    const filtered = services.filter((service) =>
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayServices(filtered.slice(0, loadAll ? filtered.length : 6));
  }, [searchTerm, services, loadAll]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setLoadAll(false); // Reset loadAll when searching
  };

  const handleReadMore = (index) => {
    // Clone the current state to avoid direct mutation
    let servicesUpdated = [...displayServices];
    // Set full description for the clicked service
    servicesUpdated[index].fullDescription = true;
    setDisplayServices(servicesUpdated);
  };

  const handleLoadAll = () => {
    setLoadAll(true);
  };

  const renderDescription = (description, index) => {
    if (description.length > 100 && !displayServices[index].fullDescription) {
      return (
        <>
          {description.substring(0, 100)}...
          <Button onClick={() => handleReadMore(index)}>Read more</Button>
        </>
      );
    } else {
      return (
        <Typography
          variant="body2"
          color="text.secondary"
          style={{
            maxHeight: '100px', // Set a max height to contain the text within the card
            overflow: 'auto', // Allow scroll if the content is too long
            whiteSpace: 'pre-wrap' // Wrap text to next line
          }}
        >
          {description}
        </Typography>
      );
    }
  };
  
  

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2" gutterBottom align="center">
        All Services
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label="Search Services"
          variant="outlined"
          onChange={handleSearchChange}
          value={searchTerm}
          sx={{ width: "100%", maxWidth: "500px" }}
        />
      </Box>
      <Grid container spacing={2}>
        {displayServices.map((service, index) => (
          <Grid item key={service._id} xs={12}>
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                position: "relative",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 160, height: 160, objectFit: "cover" }}
                  image={service.serviceImage}
                  alt={service.serviceName}
                />
                <CardContent sx={{ flex: "1 0 auto", overflow: 'auto' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {service.serviceName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {renderDescription(service.serviceDescription, index)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <CardMedia
                      component="img"
                      image={service.providerImage}
                      alt={service.providerName}
                      sx={{ width: 50, height: 50, borderRadius: "50%", mr: 2 }}
                    />
                    <Typography variant="subtitle1">
                      {service.providerName}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Area: {service.serviceArea}
                  </Typography>
                  <Typography variant="body1">
                    Price: ${service.servicePrice}
                  </Typography>
                </CardContent>
              </Box>
              <CardActions sx={{ position: "absolute", bottom: 8, right: 16 }}>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/services/${service._id}`}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {!loadAll && (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button variant="contained" onClick={handleLoadAll}>
            Load All Services
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default AllServices;
