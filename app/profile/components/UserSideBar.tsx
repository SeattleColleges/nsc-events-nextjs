import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditUserDetailsDialog, { User } from './EditUserDetailsDialog';
import router from 'next/router';
import { useUser } from '@/context/UserContext';


const UserSideBar = () => {

  const { user, setUser } = useUser();
  
  const [openEditDialog, setOpenEditDialog] = useState(false);

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
            width: '15%',
            minWidth: '180px',
            height: '600px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: '7px',        
            padding: "35px",
            boxShadow: 3
        }}>
        <Avatar sx={{ height: 140, width: 140, fontSize: '50px', marginBottom: '25px' }}>
          {user?.firstName.charAt(0).toUpperCase()}{user?.lastName.charAt(0).toUpperCase()}
        </Avatar>
        
        <Typography >Email:</Typography>
        { user && (
          <>
            <Typography>{user.email}</Typography>
            <Box sx={{ marginTop: 'auto', width: '100%', textAlign: 'center' }}>
              <Button onClick={handleEditClick} sx={{ mt: 2 }}>
                Edit Profile
              </Button>
              <Button onClick={() => router.replace('/auth/change-password')} sx={{ mt: 2 }}>
                Change Password
              </Button>
            </Box>
          
            {openEditDialog && (
                <EditUserDetailsDialog open={openEditDialog} onClose={handleCloseEditDialog} user={user} />
            )}
          </>
        )}
        {/* Date Created and Date Last Edited (needs to be implemented in fetch user) */}
        {/* Edit/Delete Buttons for User */}
    </Box>
  )
}

export default UserSideBar