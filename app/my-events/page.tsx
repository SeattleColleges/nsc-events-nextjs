"use client";

import useAuth from "@/hooks/useAuth";
import '../globals.css';
import MyEventsList from "@/components/ViewMyEventsGetter";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import theme from "../theme";

// Page to view logged-in user's created events (Admin/Creator ONLY)
const MyEvents: React.FC = () => {
    const { isAuth, user } = useAuth()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    // check if user is authorized to access page
    if (isAuth && (user?.role == 'admin' || user?.role == 'creator')) {
        return(
            <Container maxWidth={false} className="bg-solid">
                <Typography
                    fontSize={isMobile ? "1.75rem" : "2.25rem"}
                    textAlign={"center"}
                    padding={"1rem"}
                    marginTop={"1rem"}
                    marginBottom={"1rem"}
                >My Created Events
                </Typography>
                <MyEventsList />
            </Container>
        );
    } else {
      return <UnauthorizedPageMessage />;
    }
};

export default MyEvents;