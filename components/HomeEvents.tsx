'use client';

import React, { useEffect, useState } from "react";
import { Grid, Button, useMediaQuery, useTheme, Container, Box, Typography } from '@mui/material';
import { ActivityDatabase } from "@/models/activityDatabase";
import HomeEventsCard from "./HomeEventsCard";
import { useFilteredEvents } from "@/utility/queries";
import Link from "next/link";
import TagSelector from "@/components/TagSelector";
import { EventTags } from "@/utility/tags";

export function HomeEventsList() {
    const [page, setPage] = useState(1);
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const [reachedLastPage, setReachedLastPage] = useState(false);
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [showTags, setShowTags] = useState(false);  // State to control tag visibility
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
        setEvents([]);
        setPage(1);
        if (activeTags.includes(clickedTag)) {
            const newTags = activeTags.filter(t => t !== clickedTag);
            setActiveTags(newTags);
        } else {
            setActiveTags((prevTags) => [...prevTags, clickedTag]);
        }
    };

    // Toggle the visibility of the tag selector
    const toggleTagVisibility = () => {
        setShowTags(prev => !prev);
    };

    return (
        <Container maxWidth={false}>
            <Grid
                container
                flexDirection={(isMobile || isTablet) ? "column" : "row"}
                justifyContent="center"
                alignItems="center"
                sx={{ m: "auto" }}
            >
                <Box marginY={5} maxWidth={'md'}>
                    {/* Toggle button to show/hide the TagSelector */}
                    <Button variant="contained" onClick={toggleTagVisibility}>
                        {showTags ? 'Hide Tags' : 'Filter by Tags'}
                    </Button>

                    {/* Conditionally render the TagSelector based on `showTags` */}
                    {showTags && (
                        <TagSelector
                            selectedTags={activeTags}
                            allTags={[...EventTags]}
                            onTagClick={handleTagClicked}
                        />
                    )}
                </Box>

                {/* Display the events */}
                {events.length > 0 ? (
                    events.map((event: ActivityDatabase) => (
                        <Grid item xs={12} key={event._id}>
                            
                                <HomeEventsCard key={event._id} event={event} />
                            
                        </Grid>
                    ))
                ) : (
                    <Typography>
                        {isLoading ? 'Loading...' : 'Found no events with selected tags!'}
                    </Typography>
                )}

                {/* Load more button */}
                {data && data.length > 0 && !reachedLastPage && (
                    <Button
                        onClick={handleLoadMoreEvents}
                        type="button"
                        variant="contained"
                        color="primary"
                        style={{ textTransform: "none", margin: '1em auto' }}
                    >
                        Load more events
                    </Button>
                )}
            </Grid>
        </Container>
    );
}

export default HomeEventsList;
