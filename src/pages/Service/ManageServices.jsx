import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AuthContext } from "../../providers/AuthProvider";
import { Link} from "react-router-dom";
import { Snackbar, Alert } from '@mui/material';

const ManageServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const url = `https://home-service-server-seven.vercel.app/manageservices?email=${user?.email}`;

  useEffect(() => {
    axios
      .get(url, {withCredentials:true})
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, [url]);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure you want to delete?");
    if (proceed) {
        fetch(`https://home-service-server-seven.vercel.app/services/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                  setSnackbarMessage('Booking status deleted successfully!');
                  setOpenSnackbar(true);
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining);
                }
                else{
                  setSnackbarMessage('Failed to delete booking.');
                  setOpenSnackbar(true);
                }
            })
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  return (
    <div>
    <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>
      services added by {user.displayName}
    </h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {services.map((service) => (
        <Card key={service._id} sx={{ maxWidth: 345, margin: '10px' }}> {/* Added margin for spacing around the cards */}
          <CardMedia
            component="img"
            height="140"
            image={service.serviceImage}
            alt={service.serviceName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {service.serviceName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {service.serviceDescription}
            </Typography>
            <Typography variant="body1" color="text.primary">
              Price: ${service.servicePrice}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" component={Link} to={`/editService/${service._id}`}>
              Edit
            </Button>
            <Button size="small" color="secondary" onClick={() => handleDelete(service._id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
    <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
  </div>
  
  );
};

export default ManageServices;
