import React from 'react'
import { Box, Typography } from '@mui/material'

interface UserContentProps {}

const UserContent: React.FC<UserContentProps> = () => {
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
        padding: { xs: "15px", sm: "25px", md: "35px" }, // Adjust padding for smaller screens
        marginBottom: { xs: '15px', sm: '0px' }, // Add spacing when stacked in small screens
        boxShadow: 3
      }}
    >
      <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
        User Content
      </Typography>
    </Box>
  )
}

export default UserContent;
