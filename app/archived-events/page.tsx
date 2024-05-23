'use client';

import {useArchivedEvents} from "@/utility/queries";
import {ActivityDatabase} from "@/models/activityDatabase";
import EventCard from "@/components/EventCard";
import {Container, Grid} from "@mui/material";
import React, {useState} from "react";
import styles from '@/app/home.module.css'

const ArchivedEvents = () => {
    const [page, setPage] = useState(1)
    const {data} = useArchivedEvents(page)
    return (
        <Container maxWidth={false} className={styles.container}>
            <p className={styles.title}>Archived Events</p>
            <Grid
                container
                direction={'column'}
                spacing={1}
                alignItems={'center'}
                justifyItems={'center'}
            >
                {
                    data?.map((event: ActivityDatabase) => (
                        <EventCard
                            key={event._id}
                            event={event}
                        />
                    ))
                }
            </Grid>
        </Container>
    );
};

export default ArchivedEvents;