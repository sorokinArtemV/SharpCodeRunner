import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';


interface IButtonAppbar {
  children: React.ReactNode;
}

const ButtonAppBar = ({ children }: IButtonAppbar) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 3, marginBottom: 2 }}>
        <Toolbar sx={{ gap: 2 }}>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;