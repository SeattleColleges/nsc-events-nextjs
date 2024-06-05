import Link from "next/link";
import { Box, Button, Container } from '@mui/material';
import { FC } from "react";

const Admin = () => {
    interface AdminButtonProps {
        path: string;
        text: string;
    }
    const AdminButton: FC<AdminButtonProps> = ({path, text}) => {
        return (
            <Button
                variant="contained"
                color="primary"
                style={{margin: 'auto 0.25em'}}
            >
                <Link href={ path }>{ text }</Link>
            </Button>
        )
    }
  return (
      <Container >
          <Box
              display="flex"
              justifyContent="center"
              alignContent="center"
              height="100vh"
          >
              <AdminButton path={'/edit-user-role-page'} text={"Edit User Role"}/>
              <AdminButton path={'/create-event'} text={"Create Event"}/>
              <AdminButton path={'/my-events'} text={"View My Events"}/>
              <AdminButton path={'/archived-events'} text={"View Archived Events"}/>
              <AdminButton path={'/'} text={"View All Events"}/>
          </Box>
      </Container>
  );
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