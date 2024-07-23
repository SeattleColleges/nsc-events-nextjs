"use client";
import Link from "next/link";
import { Box, Button, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from "react";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import useAuth from "@/hooks/useAuth";

const Admin = () => {
    const { isAuth, user } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    interface AdminButtonProps {
        path: string;
        text: string;
    }

    const AdminButton: FC<AdminButtonProps> = ({ path, text }) => {
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

    if (isAuth && (user?.role === 'admin')) {
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
                    alignContent="center"
                    height="60vh"
                    flexDirection="column"
                >
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} sm="auto">
                            <AdminButton path={'/edit-user-role-page'} text={"Edit User Role"}/>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <AdminButton path={'/create-event'} text={"Create Event"}/>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <AdminButton path={'/my-events'} text={"View My Events"}/>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <AdminButton path={'/archived-events'} text={"View Archived Events"}/>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                            <AdminButton path={'/'} text={"View All Events"}/>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        );
    } else {
        return <UnauthorizedPageMessage/>
    }
};

export default Admin;
// todo: this will be the dedicated admin page for users with admin privileges once they've signed in

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