import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

interface UserHeaderProps {
  firstName: string;
  lastName: string;
  pronouns: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ firstName, lastName, pronouns }) => {

  const { palette } = useTheme();
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";

  return (
    <Box
        sx={{
          width: "100%", // Full width of the parent container
          height: "auto", 
          backgroundColor: containerColor,
          display: "flex",
          alignItems: "center", // Center items vertically within the parent Box
          justifyContent: "flex-start", // Align content to the left
          borderRadius: '7px',
          boxShadow: 3
        }}
      >
      {/* Inner Box for Typography elements */}
      <Box
        sx={{
          width: { md:"20%", lg: "15%", sm: "30%", xs: "100%" }, 
          display: "flex",
          flexDirection: "column", // Stack items vertically
          alignItems: "center", 
          justifyContent: "center", 
          marginY:'15px',
          padding: { xs: "5px", sm: "10px", md: "15px" }, 
        }}
      >
        <Typography sx={{ fontSize: { xs: '1rem', sm:"1.25rem", md: '1.5rem' } }}>{firstName} {lastName}</Typography>
        <Typography sx={{ fontSize: { xs: '0.7rem', sm:"0.85rem", md: '1rem' } }}>({pronouns})</Typography>
        {/* Role Still Needs To Be Extracted From Backend */}
        <Typography sx={{ fontSize: { xs: '0.7rem', sm:"0.85rem", md: '1rem' } }}>Role</Typography>
      </Box>
    </Box>
  )
}

export default UserHeader