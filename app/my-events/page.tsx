"use client";
import useAuth from "@/hooks/useAuth";
import MyEventsList from "@/components/ViewMyEventsGetter";
import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";

// Page to view logged-in user's created events (Admin/Creator ONLY)
const MyEvents: React.FC = () => {
    const { isAuth, user } = useAuth()
    const theme = useTheme();
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