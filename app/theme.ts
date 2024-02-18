'use client';
import { createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';

const theme = createTheme({
  // Customize your theme here
  palette: {
    primary: {
      main: blue[800], //alternatively '#1565c0'
    },
    secondary: {
      main: green[500], 
    },
    background: {
      default: '#bec3c8', 
      paper: '#dbdfe0', 
    },
    // Add additional theme configurations as needed
  },
  // You can also customize other theme aspects like typography, breakpoints, etc.
});

export default theme;