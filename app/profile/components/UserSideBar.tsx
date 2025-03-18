"use client";

import { Avatar, Box, Button, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import EditUserDetailsDialog, { User } from './EditUserDetailsDialog';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';


const UserSideBar = () => {
  const { user, setUser } = useUser();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { palette } = useTheme();
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";
  
  const router = useRouter();

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = (updatedUser?: User) => {
    setOpenEditDialog(false);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  return (
    <Box 
      sx={{
        width: { xs: '35%', md: '25%', lg: '15%' }, // Adjust width based on screen size
        minHeight: "600px",
        backgroundColor: containerColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '7px',        
        padding: { xs: "15px", sm: "20px", md: "25px" }, // Adjust padding for smaller screens
        boxShadow: 3,
        marginBottom: { xs: '15px', sm: '0px' } // Add spacing when stacked in small screens
      }}
    >
      <Avatar 
        sx={{ 
          height: { xs: 80, sm: 100, md: 120, lg: 140 }, // Resize avatar
          width: { xs: 80, sm: 100, md: 120, lg: 140 }, 
          fontSize: { xs: '30px', sm: '40px', md: '50px' }, 
          marginBottom: '25px' 
        }}
      >
        {user?.firstName.charAt(0).toUpperCase()}{user?.lastName.charAt(0).toUpperCase()}
      </Avatar>
      
      <Typography sx={{ fontSize: { xs: '0.7rem', sm: '1rem', md: '1.1rem' } }}>Email:</Typography>
      
      { user && (
        <>
          <Typography sx={{ fontSize: { xs: '0.6rem', sm: '0.95rem', md: '1rem' } }}>
            {user.email}
          </Typography>
          
          <Box sx={{ marginTop: 'auto', width: '100%', textAlign: 'center' }}>
            <Button onClick={handleEditClick} sx={{ mt: 2, fontSize: { xs: '0.6rem', sm: '0.85rem', md: '1rem' } }}>
              Edit Profile
            </Button>
            <Button onClick={() => router.replace('/auth/change-password')} sx={{ mt: 2, fontSize: { xs: '0.6rem', sm: '0.85rem', md: '1rem' } }}>
              Change Password
            </Button>
          </Box>

          {openEditDialog && (
            <EditUserDetailsDialog open={openEditDialog} onClose={handleCloseEditDialog} user={user} />
          )}
        </>
      )}
    </Box>
  )
}

export default UserSideBar;
