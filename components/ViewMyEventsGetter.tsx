'use client';

import { ActivityDatabase } from "@/models/activityDatabase";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    const response = await fetch(`http://localhost:3000/api/events/user/${userId}`);
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
                    <Grid item xs={12} key={event._id}>
                        <Link href={
                            {
                                pathname: "/event-detail",
                                query: {
                                    id: event._id,
                                },
                            }
                        } >
                            <Box sx={{ width: 700, height: 130 }}>
                                <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h5" align="left" fontWeight={"bold"}>
                                            {event.eventTitle}
                                        </Typography>
                                        <Typography variant="body2" align="right" color="text.secondary">
                                            Date: {event.eventDate}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Link>
                    </Grid>
                ))}
            </Grid>
    );
}

export default MyEventsList;