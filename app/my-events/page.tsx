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
            <Container maxWidth={false} className={styles.container}>
                <Box className={styles.title}>
                    <Typography
                        variant={"h2"}
                        fontSize={"xx-large"}
                        textAlign={"center"}
                        padding={"1rem"}
                        marginBottom={"1rem"}
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