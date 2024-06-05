import Link from "next/link";
import { Box, Button, Container } from '@mui/material';
import { FC } from "react";

const Creator = () => {
    interface CreatorButtonProps {
      path: string;
      text: string;
    }
    const CreatorButton: FC<CreatorButtonProps> = ({path, text}) => {
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
    <Container>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CreatorButton path={"/create-event"} text={"Create Event"}/>
            <CreatorButton path={"/my-events"} text={"View My Events"}/>
            <CreatorButton path={"/archived-events"} text={"View Archived Events"}/>
            <CreatorButton path={"/"} text={"View All Events"}/>
        </Box>
        {/* <h1>Placeholder for the creator page so npm run build compiles successfully.</h1>
          <p>FIX: move to pages or use getSession from nextauth</p>
          <p>FIX: allow only users with creator role to be routed to this page</p> */}
          
      </Container>
  );
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