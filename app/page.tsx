"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import HomeEventsList from "@/components/HomeEvents";
import UpcomingEvent from "@/components/UpcomingEvent";
import { Box, Button, CardMedia, Paper, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material";
import LoginWindow from "@/components/LoginWindow";
import HomeEventDetails from "@/components/HomeEventDetails";
import { useSearchParams } from "next/navigation";
import { useEventById } from "@/utility/queries"; // Adjust
import { ActivityDatabase } from "@/models/activityDatabase";

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { palette } = useTheme();


  // Get the search params from the URL
  // This will allow us to extract the eventId from the URL and fetch the event data
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");

  // Fetch the event data using the eventId from the URL
  // If no eventId is found, it will return null and not fetch any data
  const { data: event, isLoading: eventLoading } = useEventById(eventId);

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
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  return (
    <Box sx={{ flexGrow: 1, height: "100vh", width: "100vw", p: 2 }}>
      <Grid container spacing={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: (isMobile || isTablet) ? "column-reverse" : "row",
          }}
        >
          <Grid
            size={eventId && event ? 6 : (isMobile || isTablet) ? 12 : 100}
            sx={{
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: (isMobile || isTablet) ? "100vw" : "auto",
              p: 2
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
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
                textAlign={"center"}
                pt={4}
                sx={{
                  borderBottom: "3px solid #333",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "85%",
                }}
              >
                Upcoming Events
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  overflowY: "scroll",
                  height: "100%",
                  marginBlock: 2
                }}
              >
                {/* <UpcomingEvent /> */}
                <HomeEventsList />
              </Box>
            </Box>
          </Grid>
          {!token ? (
            <Grid
              size={(isMobile || isTablet) ? 12 : 0}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textWrap: "balance",
                minWidth: "400px",
                marginBottom: "4px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "auto",
                  mt: 6,
                }}
              >
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  fontFamily="font-serif"
                  fontWeight="500"
                  maxWidth="65ch"
                >
                  Welcome to North Seattle College Events
                </Typography>
                <LoginWindow />
              </Box>
            </Grid>
          ) :
            <Grid size={6}>
              {eventId && event ? (<HomeEventDetails event={event} />) : null}
            </Grid>
          }
        </Box>
      </Grid>
    </Box>
  );
};

export default Home;
