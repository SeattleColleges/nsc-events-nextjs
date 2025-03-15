import React from 'react'
import { Box, Typography } from '@mui/material'

interface UserContentProps {}

const UserContent: React.FC<UserContentProps> = () => {

  const headerStyle = {
    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px'
  };


  return (
    <Box 
      sx={{
        width: { xs: '70%', md: '75%', lg: '85%' }, 
        minHeight: "600px",
        marginLeft: '10px' , 
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '7px',
        padding: { xs: "10px", sm: "15px", md: "20px" }, // Adjust padding for smaller screens
        marginBottom: { xs: '15px', sm: '0px' }, // Add spacing when stacked in small screens
        boxShadow: 3
      }}
    >
      <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
        User Content
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'space-between', marginTop: '15px', width: '100%', height: '100%' }}>
        <Box sx={{ width: '35%', boxShadow: 3, height: '100%', backgroundColor: '#BDBDBD', borderRadius: '7px'}}>
          <Typography sx={headerStyle}>
            Bio/Affiliations
          </Typography>
        </Box>
        <Box sx={{ width: '65%', boxShadow: 3, height: '100%', backgroundColor: '#BDBDBD', borderRadius: '7px'}}>
          <Typography sx={headerStyle}>
            Events Attended
          </Typography>
        </Box>
        
      </Box>
      
    </Box>
  )
}

export default UserContent;
