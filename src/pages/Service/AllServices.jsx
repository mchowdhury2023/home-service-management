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
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://home-service-server-seven.vercel.app/sortservices");
        if (Array.isArray(response.data)) { // Check if the response data is an array
          setServices(response.data);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Filter services based on search term
    if (Array.isArray(services)) {
      // Filter services based on search term
      const filtered = services.filter((service) =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort services based on sortOrder
      const sorted = [...filtered].sort((a, b) => 
        sortOrder === "asc" ? a.servicePrice - b.servicePrice : b.servicePrice - a.servicePrice
      );

      setDisplayServices(sorted.slice(0, loadAll ? sorted.length : 6));
    }
  }, [searchTerm, services, loadAll, sortOrder]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setLoadAll(false); // Reset loadAll when searching
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleReadMore = (index) => {
    let servicesUpdated = [...displayServices];
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
            maxHeight: '100px',
            overflow: 'auto',
            whiteSpace: 'pre-wrap'
          }}
        >
          {description}
        </Typography>
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
  <Typography variant="h2" gutterBottom>
    All Services
  </Typography>
  
  <Box>
    <Typography variant="subtitle1" gutterBottom>
      Sort by price
    </Typography>
    <Button variant="outlined" onClick={toggleSortOrder}>
      {sortOrder === "asc" ? "High to Low" : "Low to High"}
    </Button>
  </Box>
</Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label="Search Service By Name"
          variant="outlined"
          onChange={handleSearchChange}
          value={searchTerm}
          sx={{ width: "100%", maxWidth: "500px" }}
        />
      </Box>
      <Grid container spacing={2}>
        {displayServices.map((service, index) => (
          <Grid item key={service._id} xs={12} md={6} lg={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between"
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "100%", height: 160, objectFit: "cover" }}
                image={service.serviceImage}
                alt={service.serviceName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {service.serviceName}
                </Typography>
                {renderDescription(service.serviceDescription, index)}
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
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
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
