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
  Drawer,
  List,
  ListItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from '../../assets/homeservice-logo.png';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderMenuItems = () => (
    <>
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
            <MenuItem onClick={handleClose} component={Link} to="/my-services">
              My Services
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/add-service">
              Add Service
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/bookings">
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
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        )}

        <img src={logo} alt="Home Service Logo" style={{ maxWidth: '120px', marginRight: 'auto' }} />

        {isMobile ? (
          <>
            <Drawer anchor="right" open={mobileMenuOpen} onClose={toggleMobileMenu}>
              <List>
                {renderMenuItems()}
              </List>
            </Drawer>
          </>
        ) : (
          renderMenuItems()
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
