import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from "react-router-dom";
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
import PipeVolumeCalculator from "./components/PipeVolumeCalculator";

const App: React.FC = () => {
  const theme = useAppTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const getTitle = () => {
    switch (location.pathname) {
      case '/chlorine-dosage-calculator/chlorine-dosage':
        return 'Chlorine Dosage Calculator';
      case '/chlorine-dosage-calculator/pipe-volume':
        return 'Pipe Volume Calculator';
      default:
        return 'Chlorine Dosage Calculator';
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
            <ListItem button component={Link} to="/chlorine-dosage-calculator/chlorine-dosage">
              <ListItemText primary="Chlorine Dosage" />
            </ListItem>
            <ListItem button component={Link} to="/chlorine-dosage-calculator/pipe-volume">
              <ListItemText primary="Pipe Volume" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Container>
        <Routes>
        <Route path="/" element={<Navigate to="/chlorine-dosage-calculator/chlorine-dosage" />} />
          <Route path="/chlorine-dosage-calculator" element={<Navigate to="/chlorine-dosage-calculator/chlorine-dosage" />} />
          <Route path="/chlorine-dosage-calculator/chlorine-dosage" element={<ChlorineDosageCalculator />} />
          <Route path="/chlorine-dosage-calculator/pipe-volume" element={<PipeVolumeCalculator />} />
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
