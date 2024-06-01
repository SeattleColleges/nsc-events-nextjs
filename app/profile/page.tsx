"use client"

import { getCurrentUserId } from "@/utility/userUtils";
import {Box, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import CurrentUserCard from "@/components/CurrentUserCard";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    pronouns: string
}
const Profile = () => {
    const [user, setUser] = useState<User>()
    const getUserFromId = async (userId: string) => {
        const response = await fetch(`http://localhost:3000/api/users/find/${userId}`);
        if (!response.ok) {
            throw new Error();
        }
        const data = await response.json();
        setUser(data)
    }
    useEffect(()=>{
        const userId = getCurrentUserId();
        getUserFromId(userId);
    },[])
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack>
                <Typography component="h1" variant="h4" sx={{ mt: 2, mb: 3 }}>
                    Welcome, {user?.firstName}
                </Typography>
                {
                    user &&
                    <CurrentUserCard user={user}/>
                }
            </Stack>
        </Box>
    );
};

export default Profile;