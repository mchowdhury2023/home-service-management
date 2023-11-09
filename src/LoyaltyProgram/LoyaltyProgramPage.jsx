import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MembershipOptionCard from "./MembershipOptionCard";

import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoyaltyProgramPage = () => {
  const { user } = useContext(AuthContext);
  const [isMember, setIsMember] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check membership status
    if (user) {
      // Replace URL with your API endpoint to check membership status
      axios
        .get(`https://home-service-server-seven.vercel.app/membership/status?email=${user.email}`)
        .then((response) => setIsMember(response.data.isMember));
    }
  }, [user]);

  const membershipOptions = [
    {
      title: "Silver",
      benefits: ["10% discount on all services", "Can pay in Installment"],
      price: "$20/Month",
    },
    {
      title: "Gold",
      benefits: [
        "15% discount on all services",
        "Can pay in Installment",
        "Follow Up Services",
      ],
      price: "$50/Month",
    },
    // Add more membership options as needed
  ];

  const handleBecomeMember = (plan) => {
    if (user) {
      axios
        .post("https://home-service-server-seven.vercel.app/members", {
          name: user.displayName,
          email: user.email,
          plan,
        })
        .then((response) => {
          console.log(response.data);
          setIsMember(true);
          setOpenModal(true); // Open the modal on successful registration
        });
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/");
  };

  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
        margin: "auto",
        maxWidth: "1200px",
        padding: 2,
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        Loyalty Program
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Why Join Our Loyalty Program?
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        <ul
          sx={{ listStyle: "none", padding: 0, margin: 0, textAlign: "center" }}
        >
          <li>Exclusive discounts and offers</li>
          <li>Early access to new services</li>
          <li>Points for every booking that can be redeemed for rewards</li>
          {/* Add more benefits here */}
        </ul>
      </Typography>

      <Typography
        variant="h5"
        sx={{ textAlign: "center", mt: "30px", mb: "30px" }}
        gutterBottom
      >
        Choose Your Membership
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", width: "100%" }}
      >
        {membershipOptions.map((option, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <div
              sx={{
                width: "100%",
                maxWidth: "345px",
                height: "400px", // Fixed height for all cards
                margin: 2,
              }}
            >
              <MembershipOptionCard
                title={option.title}
                benefits={option.benefits}
                price={option.price}
                onJoin={() => handleBecomeMember(option.title)}
              />
            </div>
          </Grid>
        ))}
      </Grid>

      {isMember && (
        <Typography variant="h6">You are already a member!</Typography>
      )}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Membership Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are now a member!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoyaltyProgramPage;
