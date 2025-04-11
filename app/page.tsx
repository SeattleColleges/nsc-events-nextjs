"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import HomeEventsList from "@/components/HomeEvents";
import { Box, Button, CardMedia, Paper, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material";
import { ActivityDatabase } from "@/models/activityDatabase";
import { useFilteredEvents } from "@/utility/queries";
import HomeEventCard from "@/components/HomeEventCard";
import { EventTags } from "@/utility/tags";
import TagSelector from "@/components/TagSelector";

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState<ActivityDatabase[]>([]);
  const [reachedLastPage, setReachedLastPage] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState(false);  // State to control tag visibility
  const { palette } = useTheme();

  const { data, isLoading } = useFilteredEvents(page, true, activeTags);
  console.log("data", data);
  

  // Reference the image paths directly instead of using imports
  const googlePlayImage = '/images/google_play.png'
  const darkImagePath = '/images/north-seattle-tree-frogs.png';
  const lightImagePath = '/images/north-seattle-tree-frogs.png';
  const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;

  // Check if the user is on a tablet or mobile device
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  // Load the token from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

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
    <Box
      sx={{
        
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
      }}
    >
        <CardMedia>
          <Image
            src={imagePath}
            alt="NSC Logo"
            width={isMobile ? 200 : 300}
            height={isMobile ? 150 : 150}
          />
        </CardMedia>

        <Typography
          variant="h4"
          fontFamily="font-serif"
          fontWeight="500"
          textAlign="center"
          pt={4}
          sx={{
            borderBottom: "3px solid #333",
            width: "85%",
          }}
        >
          Upcoming Events
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            
            width: "100%",
            mt: 2,
          }}
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
          {data && data.length > 0 ? (
            data.map((event: ActivityDatabase) => (     
              <HomeEventCard key={event._id} event={event} />                             
            ))
          ) : (
            <Box>
              {isLoading ? <CircularProgress /> : 'Found no events with selected tags!'}
            </Box>
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
        </Box>    
    </Box>

  );
};

export default Home;
