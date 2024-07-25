'use client';

import React, { useEffect, useState } from "react";
import { Grid, Button, useMediaQuery, useTheme, Container, Box, Typography } from '@mui/material';
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
    const { data, isLoading } = useFilteredEvents(page, true, activeTags);

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
        setEvents([])
        setPage(1)
        if (activeTags.includes(clickedTag)) {
            const newTags = activeTags.filter(t => t !== clickedTag);
            setActiveTags(newTags);
        } else {
            setActiveTags((prevTags) => [...prevTags, clickedTag]);
        }
    }
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
                    events.length > 0 ?
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
                )): <Typography>
                            { isLoading ? 'Loading...': 'Found no events with selected tags!' }
                    </Typography>
                }
            {
                data && data.length > 0 && !reachedLastPage &&
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