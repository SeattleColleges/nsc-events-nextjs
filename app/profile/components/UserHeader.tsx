import { Box, Typography } from '@mui/material'
import React from 'react'

interface UserHeaderProps {
  firstName: string;
  lastName: string;
  pronouns: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ firstName, lastName, pronouns }) => {
  return (
    <Box
        sx={{
          width: "100%", // Full width of the parent container
          height: "auto", // Adjust height as needed
          backgroundColor: "white",
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
      width: "15%",
      display: "flex",
      flexDirection: "column", // Stack items vertically
      alignItems: "center", // Center text horizontally within this Box
      justifyContent: "center", // Center text vertically within this Box
      marginY:'15px',
    }}
  >
    <Typography variant="h4" sx={{ fontSize: "24px" }}>{firstName} {lastName}</Typography>
    <Typography sx={{ fontSize: "16px" }}>({pronouns})</Typography>
    {/* Role Still Needs To Be Extracted From Backend */}
    <Typography sx={{ fontSize: "16px" }}>Role</Typography>
  </Box>
</Box>
  )
}

export default UserHeader