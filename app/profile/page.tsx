"use client"

import { getCurrentUserId } from "@/utility/userUtils";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CurrentUserCard from "@/components/CurrentUserCard";
import { useRouter } from "next/navigation";
import EditUserDetailsDialog, { User } from "@/components/EditUserDetailsDialog";

// interface User {
//     firstName: string;
//     lastName: string;
//     email: string;
//     pronouns: string
// }

const URL = process.env.NSC_EVENTS_PUBLIC_API_URL || "http://localhost:3000/api";

const Profile = () => {
    const [user, setUser] = useState<User>();
    const [token, setToken] = useState<string | null>();
    const [openEditDialog, setOpenEditDialog] = useState(false);
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


    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack>
                <Typography component="h1" variant="h4" sx={{ mt: 2, mb: 3 }}>
                    Welcome, { user?.firstName }
                </Typography>
                <CurrentUserCard user={user}/>
                <Button onClick={handleEditClick}>Edit</Button>
                <Button onClick={ () => router.replace('/auth/change-password') }>
                    Change Password
                </Button>
                {openEditDialog && (
                    <EditUserDetailsDialog open={openEditDialog} onClose={handleCloseEditDialog} user={user} />
                )}
            </Stack>
        </Box>
    );
};

export default Profile;