
const Profile = () => {
    // Temporary boilerplate code to make it compile
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Placeholder Profile so npm run build compiles successfully.</h1>
            <p>FIX: move to pages or use getSession from nextauth</p>
        </div>
    );
};

export default Profile;
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