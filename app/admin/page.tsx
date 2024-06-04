import Link from "next/link";
import { Button, Container } from '@mui/material';
import styles from "./admin-page.module.css";

const Admin = () => {
  // Temporary boilerplate code to make it compile
  return (
      <Container className={styles.container}>
          {/* <h1>Placeholder for the admin page so npm run build compiles successfully.</h1>
          <p>FIX: move to pages or use getSession from nextauth</p>
          <p>FIX: allow only users with admin role to be routed to this page</p> */}
          <Button className={styles.button}>Edit User Role</Button>
          <Button className={styles.button}><Link href="/create-event">Create Event</Link></Button>
          <Button className={styles.button}><Link href="/my-events">View My Events</Link></Button>
          <Button className={styles.button}><Link href="/archived-events">View Archived Events</Link></Button>
          <Button className={styles.button}><Link href="/">View All Events</Link></Button>
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