import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import JumpstartLogo from "../assets/start.svg";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme with modern typography
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
      letterSpacing: '0.5px'
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.5px',
      textTransform: 'capitalize'
    }
  },
});

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Services', path: '/services' },
  { label: 'Team', path: '/team' },
  { label: 'News & Events', path: '/news-events' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.path} 
            component={Link} 
            to={item.path}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
                letterSpacing: '0.3px'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: '#fea434',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Toolbar className="justify-between">
          <Box sx={{ flexGrow: 1 }} className="flex items-center">
            <img
              src={JumpstartLogo}
              alt="Jumpstart Logo"
              className="w-10 h-10 mr-2"
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: 'white',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              
            </Typography>
          </Box>

          <Box className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{ 
                  color: 'white',
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className="block md:hidden"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            backgroundColor: '#fea434',
            color: 'white'
          }
        }}
      >
        {drawer}
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;