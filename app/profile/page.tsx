"use client"

import { getCurrentUserId } from "@/utility/userUtils";
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import UserHeader from "./components/UserHeader";
import UserSideBar from "./components/UserSideBar";
import UserContent from "./components/UserContent";
import { UserProvider, useUser } from "@/context/UserContext";

const URL = process.env.NSC_EVENTS_PUBLIC_API_URL;

const ProfileContent = () => {
    const { isAuth } = useAuth();
    const { user, setUser } = useUser();
    const [token, setToken] = useState<string | null>();
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getUserFromId = async (userId: string) => {
        const storedToken = localStorage.getItem("token");
        
        if (!storedToken) {
            console.error("Token is missing");
            return;
        }
    
        const response = await fetch(`${URL}/users/find/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${storedToken}`, // Send token in Authorization header
                "Content-Type": "application/json"
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            setUser(data);
        } else {
            console.error("Error:", response.status, response.statusText);
        }
    };
    
    useEffect(()=> {
        setToken(localStorage.getItem('token'))
        const userId = getCurrentUserId();
        getUserFromId(userId);
    },[]);
        

    if (token === null) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ marginTop: "100px" }}>
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
            <Box> 
                <Typography component="h1" variant="h4" sx={{ textAlign: "center", mt: 3, mb: 3 }}>
                    Welcome, { user?.firstName }!
                </Typography>
                <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", margin:'auto', width: isMobile ? '75%' : '90%' }}>
                        
                    <UserHeader firstName={user.firstName} lastName={user.lastName} pronouns={user.pronouns} /> 
                    
                    <Box sx={{ display: "flex", justifyContent: "flex-start", width: "auto", marginY: '10px' }}>
                        <UserSideBar /> 
                        <UserContent />
                    </Box>
                </Box>
            </Box>
        );
    } else {
        return <UnauthorizedPageMessage/>
    }
};

const Profile = () => (
    <UserProvider>
        <ProfileContent />
    </UserProvider>
);

export default Profile;