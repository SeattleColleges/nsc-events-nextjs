"use client"

import useAuth from "@/hooks/useAuth";
import styles from "../home.module.css"
import MyEventsList from "@/components/ViewMyEventsGetter";
import { Box, Container, Typography } from "@mui/material";

// Page to view logged-in user's created events (Admin/Creator ONLY)
const MyEvents = () => {
    const { isAuth, user } = useAuth()
    // check if user is authorized to access page
    if (isAuth && (user?.role == 'admin' || user?.role == 'creator')){
        return(
            <Container className={styles.welcomeContainer}>
                <Box className={styles.title}>
                    <Typography
                        fontSize={"xxx-large"}
                        textAlign={"center"}
                    >
                        My Created Events
                    </Typography>
                </Box>
                <Box className={styles.eventContainer}>
                    <MyEventsList />
                </Box>
            </Container>
        );
    }
};

export default MyEvents