'use client';

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid } from '@mui/material';
import { ActivityDatabase } from "@/models/activityDatabase";
import EventCard from "./EventCard";

const getEvents = async() => {
    const response = await fetch("http://localhost:3000/api/events");
    return response.json();
}

export function useFilteredEvents() {
    return useQuery({
        queryKey: ["event"],
        queryFn: getEvents,
        select: (data: ActivityDatabase[]) => data.filter( event =>
            !(event.isHidden) && !(event.isArchived))?.sort((event1, event2) => {
            return new Date(event1.eventDate).getTime() - new Date(event2.eventDate).getTime();
        }),
    });
}

export function HomeEventsList(){

    const { data, isLoading, isError } = useFilteredEvents();

    if(isLoading) {
        return <span>Loading events...</span>
    } else if (isError) {
        return <span>Error when fetching events...</span>
    } else {
        return (
            <Grid container spacing={1}>
                {data?.map((event: ActivityDatabase) => (
                    <EventCard 
                        event={event} 
                    />
                ))}
            </Grid>
        );
    }
}

export default HomeEventsList;