import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

interface UserSideBarInterface {
    email: string;
}

const UserSideBar: React.FC<UserSideBarInterface> = ({email}) => {
  return (
    <Box 
        sx={{
            width: '15%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: '7px',        
            padding: "35px",
            boxShadow: 3
        }}>
        <Avatar sx={{height: 140, width: 140, fontSize: '50px', marginBottom: '25px'}}>JD</Avatar>
        <Typography >Email:</Typography>
        <Typography>{email}</Typography>
        {/* Date Created and Date Last Edited (needs to be implemented in fetch user) */}
        {/* Edit/Delete Buttons for User */}
    </Box>
  )
}

export default UserSideBar