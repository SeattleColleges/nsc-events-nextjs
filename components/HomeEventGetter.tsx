'use client';

import React, { useEffect, useState } from "react";
import {Grid, Button, useMediaQuery, useTheme, Container, Box} from '@mui/material';
import { ActivityDatabase } from "@/models/activityDatabase";
import EventCard from "./EventCard";
import { useFilteredEvents } from "@/utility/queries";
import Link from "next/link";
import TagSelector from "@/components/TagSelector";
import { EventTags } from "@/utility/tags";

export function HomeEventsList(){
    const [page, setPage] = useState(1)
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const [reachedLastPage, setReachedLastPage] = useState(false);
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const { data, refetch } = useFilteredEvents(page, true);

    useEffect(() => {
        if (data) {
            setEvents((prevEvents) => {
                const newEvents = [...prevEvents, ...data];
                // filter events to avoid duplicates (fixes Unarchive Event bug)
                const uniqueEvents = newEvents.filter((event, index, self) =>
                    index === self.findIndex((e) => e._id === event._id)
                );
                return uniqueEvents;
            });
            setReachedLastPage(data.length < 5);
        }
    }, [data]);
    const handleLoadMoreEvents = () => {
        setPage(num => num + 1);
    };
    const handleTagClicked = (clickedTag: string) => {
        if (activeTags.includes(clickedTag)) {
            const newTags = activeTags.filter(t => t !== clickedTag);
            setActiveTags(newTags);
        } else {
            setActiveTags((prevTags) => [...prevTags, clickedTag]);
        }
    }
    useEffect(() => {
        const newEvents = events.filter(e => {
           return e.eventTags.some(tag => activeTags.includes(tag));
        });
        if (newEvents.length > 0) {
            setEvents(newEvents);
        } else {
            if (data) {
                setPage(1);
                refetch().then(res => setEvents(res.data as ActivityDatabase[]));
            }
        }
    }, [activeTags]);
    return (
        <Container maxWidth={false}>
            <Grid
                container
                flexDirection={(isMobile || isTablet) ? "column" : "row" }
                justifyContent="center"
                alignItems="center"
                sx={{ m: "auto" }}
            >
                <Box
                    marginY={5}
                    maxWidth={'md'}
                >
                    <TagSelector
                        selectedTags={activeTags}
                        allTags={[
                            ...EventTags,
                        ]}
                        onTagClick={(tag) => handleTagClicked(tag)}
                    />
                </Box>
                {
                events?.map((event: ActivityDatabase) => (
                    <Grid item xs={12} key={event._id}>
                        <Link key={event._id} href={
                            {
                                pathname: "/event-detail",
                                query: {
                                    id: event._id,
                                    events: JSON.stringify(events.map(e => e._id)),
                                    from: 'home',
                                    page: page,
                                },
                            }
                        } >
                        <EventCard
                            key={event._id}
                            event={event}
                        />
                        </Link>
                    </Grid>
                ))}
            {
                !reachedLastPage &&
                <Button onClick={handleLoadMoreEvents}
                        type="button"
                        variant="contained"
                        color="primary"
                        style={{
                            textTransform: "none",
                            margin: '1em auto',
                        }}>
                    Load more events
                </Button>
            }
            </Grid>
        </Container>
    );
}

export default HomeEventsList;