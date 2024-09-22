import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';


const ButtonAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 3, marginBottom: 2 }}>
        <Toolbar sx={{ gap: 2 }}>
          <Button color="success" variant="contained">Compile</Button>
          <Button variant="outlined" color="success" disabled>History</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;