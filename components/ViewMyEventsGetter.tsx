'use client';

import { ActivityDatabase } from "@/models/activityDatabase";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";

// decode the userId from localStorage
const getUserId = () => {
    const token = localStorage.getItem('token');
    if (token !== null){
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        return userId;
    }
    return null;
}
// fetch API endpoint that contains the user's created events
const getMyEvents = async(userId: string) => {
    const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
    const response = await fetch(`${apiUrl}/events/user/${userId}`);
    return response.json();
}

export function MyEventsList() {
    // useState to hold the events from the API call
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // decode and grab the logged-in userId from localStorage
                const userId = getUserId() 
                if (userId){
                    // pull user's events from endpoint 
                    const myEvents = await getMyEvents(userId); 
                    // set them to the useState hook
                    setEvents(myEvents)
                }
            } catch (error) {
                console.error("Error fetching user's events:", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <Grid container spacing={1}>
                {events?.map((event: ActivityDatabase) => (
                    <EventCard
                        key={event._id} 
                        event={event} 
                    />
                ))}
        </Grid>
    );
}

export default MyEventsList;