'use client';

import Link from "next/link";
import { Box, Button, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from "react";
import useAuth from "@/hooks/useAuth";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";

const Creator = () => {
    const { isAuth, user } = useAuth();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    interface CreatorButtonProps {
      path: string;
      text: string;
    }
    const CreatorButton: FC<CreatorButtonProps> = ({ path, text }) => {
        return (
            <Button
                variant="contained"
                color="primary"
                style={{ margin: 'auto', width: isMobile ? '60%' : 'auto', display: 'block' }}
            >
                <Link href={ path }>{ text }</Link>
            </Button>
        )
    }

    if (isAuth && user?.role === 'creator') {
        return (
            <Container maxWidth={false} className="bg-solid">
                <Typography
                    fontSize={isMobile ? "1.75rem" : "2.25rem"}
                    textAlign={"center"}
                    padding={"1rem"}
                    marginTop={"1rem"}
                    marginBottom={"1rem"}
                >My Account</Typography>
                <Box
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                     height="60vh"
                     flexDirection="column"
                >
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm="auto">
                            <CreatorButton path={"/create-event"} text={"Create Event"}/>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <CreatorButton path={"/my-events"} text={"View My Events"}/>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <CreatorButton path={"/archived-events"} text={"View Archived Events"}/>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <CreatorButton path={"/"} text={"View All Events"}/>
                        </Grid>
                    </Grid>
                </Box>
                {/* <h1>Placeholder for the creator page so npm run build compiles successfully.</h1>
          <p>FIX: move to pages or use getSession from nextauth</p>
          <p>FIX: allow only users with creator role to be routed to this page</p> */}

            </Container>
        );
    } else {
        return <UnauthorizedPageMessage/>
    }
};

export default Creator;
// todo: this will be the users profile page when they've signed in

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const Profile = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === "loading") {
//     // Handle loading state
//     return <div>Loading...</div>;
//   }

//   if (!session) {
//     // Redirect the user to the sign-in page if there is no active session
//     router.replace("/auth/sign-in");
//     return null;
//   }

//   const { user } = session;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1>Welcome, {user?.name}!</h1>
//       <p>Email: {user?.email}</p>
//       <p>Profile information goes here...</p>
//     </div>
//   );
// };

// export default Profile;