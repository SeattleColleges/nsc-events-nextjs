"use client"

import { getCurrentUserId } from "@/utility/userUtils";
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import CurrentUserCard from "@/app/profile/components/CurrentUserCard";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import EditUserDetailsDialog, { User } from "@/app/profile/components/EditUserDetailsDialog";
import UserHeader from "./components/UserHeader";
import UserSideBar from "./components/UserSideBar";
import UserContent from "./components/UserContent";

const URL = process.env.NSC_EVENTS_PUBLIC_API_URL;

const Profile = () => {
    const { isAuth } = useAuth();
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string | null>();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const getUserFromId = async (userId: string) => {
        const response = await fetch(`${URL}/users/find/${userId}`);
        if (response.ok) {
            const data = await response.json();
            setUser(data)
        }
    }
    useEffect(()=> {
        setToken(localStorage.getItem('token'))
        const userId = getCurrentUserId();
        getUserFromId(userId);
    },[]);

    const handleEditClick = () => {
        setOpenEditDialog(true);
      };
    
      const handleCloseEditDialog = (updatedUser?: User) => {
        setOpenEditDialog(false);
        if (updatedUser) {
          setUser(updatedUser);
        }
      };    

    if (token === null) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>
                    Please sign in to view profile.
                </Typography>
            </Box>
        )
    }
    if (!user) {
        return (
            <Typography>
                Loading...
            </Typography>
        )
    }
  
    if (isAuth) {
        return (
            <>
                <Typography component="h1" variant="h4" sx={{ textAlign: "center", mt: 3, mb: 3 }}>
                    Welcome, { user?.firstName }!
                </Typography>
                <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", margin:'auto', width: isMobile ? '75%' : '90%',}}>
                        
                    <UserHeader firstName={user.firstName} lastName={user.lastName} pronouns={user.pronouns} /> 
                    
                    <Box sx={{ display: "flex", justifyContent: "flex-start", width: "auto", marginY: '10px' }}>
                        <UserSideBar email={user.email}/> 
                        <UserContent 
                        />
                    </Box>
                    {/* <CurrentUserCard user={user}/>
                    <Button onClick={handleEditClick} sx={{ mt: 2 }}>Edit Profile</Button>
                    <Button onClick={ () => router.replace('/auth/change-password') }>
                        Change Password
                    </Button>
                    {openEditDialog && (
                        <EditUserDetailsDialog open={openEditDialog} onClose={handleCloseEditDialog} user={user} />
                    )} */}
                    
                </Box>
            </>
        );
    } else {
        return <UnauthorizedPageMessage/>
    }
};

export default Profile;