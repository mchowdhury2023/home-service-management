import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");
  const { user, createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearFormFields = () => {
    setFormData({
      name: "",
      photoURL: "",
      email: "",
      password: "",
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { name, photoURL, email, password } = formData;

    setRegisterError("");
    setRegSuccess("");

    if (password.length < 6) {
      const errorMsg = "Password must be at least 6 characters long";
      setRegisterError(errorMsg);

      toast.error(errorMsg);
      clearFormFields();
      return;
    }

    if (!/[A-Z]/.test(password)) {
      const errorMsg = "Password must contain at least one uppercase letter";
      setRegisterError(errorMsg);

      toast.error(errorMsg);
      clearFormFields();
      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
      const errorMsg = "Password must contain at least one special character";
      setRegisterError(errorMsg);

      toast.error(errorMsg);
      clearFormFields();
      return;
    }

    console.log("Form Data:", formData);

    // If validations pass, continue with user creation
    createUser(email, password)
      .then((result) => {
        console.log("Firebase User:", result.user);

        // Use the values provided by the user for the displayName and photoURL
        return updateProfile(result.user, {
          displayName: formData.name,
          photoURL: formData.photoURL,
        });
      })
      .then(() => {
        updateUser({
          ...user,
          displayName: name,
          photoURL: photoURL,
        });
        const successMsg = "User created successfully";
        setRegSuccess(successMsg);
        toast.success(successMsg);

        clearFormFields();
        navigate("/");
      })
      .catch((error) => {
        console.log("Error:", error);
        setRegisterError(error.message);
        toast.error(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          p: 3,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          {/* Icon or image */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleRegister} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="photoURL"
                fullWidth
                id="photoURL"
                label="Photo URL (optional)"
                value={formData.photoURL}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
      <ToastContainer></ToastContainer>
    </Container>
  );
};

export default Register;
