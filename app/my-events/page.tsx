"use client";

import useAuth from "@/hooks/useAuth";
import '../globals.css';
import MyEventsList from "@/components/ViewMyEventsGetter";
import { Box, Container, Typography } from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";

// Page to view logged-in user's created events (Admin/Creator ONLY)
const MyEvents: React.FC = () => {
    const { isAuth, user } = useAuth()
    // check if user is authorized to access page
    if (isAuth && (user?.role == 'admin' || user?.role == 'creator')) {
        return(
            <Container maxWidth={false} className="bg-solid">
                <Typography
                    fontSize={"2.25rem"}
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