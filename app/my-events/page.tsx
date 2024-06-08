"use client";

import useAuth from "@/hooks/useAuth";
import styles from "../home.module.css";
import MyEventsList from "@/components/ViewMyEventsGetter";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";

// Page to view logged-in user's created events (Admin/Creator ONLY)
const MyEvents = () => {
    const { isAuth, user } = useAuth()
    // check if user is authorized to access page
    if (isAuth && (user?.role == 'admin' || user?.role == 'creator')) {
        return(
            <div className={styles.welcomeContainer}>
                <div className={styles.title}>
                    <h1>My Created Events</h1> 
                </div>  
                <div className={styles.eventContainer}>
                    <MyEventsList />
                </div>
            </div>   
        );
    } else {
      return <UnauthorizedPageMessage />;
    }
};

export default MyEvents;