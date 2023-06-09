import React from 'react';
import { Toolbar, Typography, Button, AppBar } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}> Home </Typography>
        <Button component={Link} to="/login" color="inherit"> Login </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Home;


