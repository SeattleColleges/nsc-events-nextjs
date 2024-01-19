'use client';

import React from "react";
import { useQuery, useIsFetching } from "@tanstack/react-query";

const getEvents = async() => {
    const response = await fetch("http://localhost:3000/api/events");
    return response.json();
}

export function EventsList(){
    
    const { data, isLoading, isError, isSuccess } = useQuery<any>({
        queryKey: ["event"],
        queryFn: getEvents
    });

    if(isLoading) {
        return <span>Loading...</span>
    } else if (isError) {
        return <span>Error when fetching events...</span>
    } else {
        return (
            <div>
                <h1>Events</h1>
                {data?.map((event: any) => (

                    <div key={event._id}>
                        <h2>{event.eventTitle}</h2>
                        <img src={event.eventCoverPhoto}/>

                    </div>

                    )

                )}
            </div>
        );
    }
}

export default EventsList;







