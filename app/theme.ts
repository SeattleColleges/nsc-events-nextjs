'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  
  palette: {
    primary: {
      main: '#08469f',
    },
    secondary: {
      main: '#95ca59',  
    },
    background: {
      default: '#FFFFF', 
      paper: '#dbdfe0', 
    },
    // Add additional theme configurations as needed
  },
  // You can also customize other theme aspects like typography, breakpoints, etc.
});

export default theme;