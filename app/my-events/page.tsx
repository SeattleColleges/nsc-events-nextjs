"use client"

import useAuth from "@/hooks/useAuth";
import styles from "../home.module.css"
import MyEventsList from "@/components/ViewMyEventsGetter";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from "react";

// Page to view logged-in user's created events (Admin/Creator ONLY)
const MyEvents: React.FC = () => {
    const { isAuth, user } = useAuth()
    // check if user is authorized to access page
    if (isAuth && (user?.role == 'admin' || user?.role == 'creator')){
        return(
            <Container className={styles.welcomeContainer}>
                <Box className={styles.title}>
                    <Typography>My Created Events</Typography> 
                </Box>  
                <Box className={styles.eventContainer}>
                    <MyEventsList />
                </Box>
            </Container>   
        );
    }
};

export default MyEvents