import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import useAppTheme from "./theme";
import ChlorineDosageCalculator from "./components/ChlorineDosageCalculator";

const App: React.FC = () => {
  const theme = useAppTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getTitle = () => {
    switch (location.pathname) {
      case '/chlorine-dosage-calculator':
        return 'Chlorine Dosage Calculator';
      // Add more cases for other routes
      default:
        return 'App Title';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {getTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItem button component={Link} to="/chlorine-dosage-calculator">
              <ListItemText primary="Chlorine Dosage Calculator" />
            </ListItem>
            {/* Add more menu items here */}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Container>
        <Routes>
          <Route path="/chlorine-dosage-calculator" element={<ChlorineDosageCalculator />} />
          {/* Add more routes here */}
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
