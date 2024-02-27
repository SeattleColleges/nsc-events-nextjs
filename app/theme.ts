'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  //Customize your theme here 
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': { color: 'white' },
          '& .MuiInputBase-input': { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
        },
      },
    },
  },
  
  palette: {
    primary: {
      main: '#08469f',
    },
    secondary: {
      main: '#95ca59',  
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