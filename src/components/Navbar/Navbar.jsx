// Navbar.js
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Website Name
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/allservices">
          Services
        </Button>
        {user ? (
          <>
            <Button color="inherit" onClick={handleMenu}>
              Dashboard
            </Button>
            <Menu
              id="menu-dashboard"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/my-services"
              >
                My Services
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/add-service"
              >
                Add Service
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/bookings"
              >
                My Schedule
              </MenuItem>
            </Menu>
            <Typography variant="subtitle1" sx={{ margin: "0 10px" }}>
              {user?.displayName || "User"}
            </Typography>
            <Avatar
              src={user?.photoURL || "/static/images/avatar/1.jpg"}
              alt="User"
              sx={{ width: 24, height: 24, margin: "0 10px" }}
            />
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
