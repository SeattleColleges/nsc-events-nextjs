import { Box, Typography } from '@mui/material'
import React from 'react'

interface UserHeaderProps {
  firstName: string;
  lastName: string;
  pronouns: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({firstName, lastName, pronouns}) => {
  return (
    <Box
  sx={{
    width: "100%", // Full width of the parent container
    height: "auto", // Adjust height as needed
    backgroundColor: "white",
    display: "flex",
    alignItems: "center", // Center items vertically within the parent Box
    justifyContent: "flex-start", // Align content to the left
    border: "2px solid black",
    borderRadius: '7px',
    margin: "10px",
    paddingLeft:'10px', // Left padding for spacing
    boxShadow: 3
  }}
>
  {/* Inner Box for Typography elements */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column", // Stack items vertically
      alignItems: "center", // Center text horizontally within this Box
      justifyContent: "center", // Center text vertically within this Box
      margin:'10px',
      
    }}
  >
    <Typography variant="h4" sx={{ fontSize: "24px" }}>{firstName} {lastName}</Typography>
    <Typography sx={{ fontSize: "16px" }}>({pronouns})</Typography>
    <Typography sx={{ fontSize: "16px", }}>Role</Typography>
  </Box>
</Box>
  )
}

export default UserHeader