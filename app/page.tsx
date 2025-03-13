"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import HomeEventsList from "@/components/HomeEventGetter";
import UpcomingEvent from "@/components/UpcomingEvent";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { useTheme } from "@mui/material";
import LoginWindow from "@/components/LoginWindow";

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { palette } = useTheme();

  // Reference the image paths directly instead of using imports
  const googlePlayImage = '/images/google_play.png'
  const darkImagePath = '/images/white_nsc_logo.png';
  const lightImagePath = '/images/blue_nsc_logo.png';

  const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";

  const theme = useTheme();
  const isXLScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

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
    <Box
      sx={{
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", pt: 4, margin: !(isMobile) ? 4 : 0, pb: 4
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <Grid sx={{
          display: "flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
            <Typography
              fontSize={isMobile ? "1.75rem" : "2.25rem"}
              textAlign={"center"}
              padding={"1rem"}
              marginBottom={isMobile ? "0.5" : "1rem"}
              sx={{
                borderBottom: "1px solid #333",
                width: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: isMobile ? -8 : isTablet ? -6 : -10,
              }}
            >
              Upcoming Events
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "calc(100vh - 200px)", // Adjust height to take up the entire window height minus some offset
                overflowY: "scroll", // Use scroll property for scroll effect
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <UpcomingEvent /> */}
              <HomeEventsList />
            </Box>
          </Box>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
            <Grid sx={{ md: 7, lg: 8, xl: 9 }} justifyContent="center">
              {!token ? (
                <LoginWindow />
              ) : null}
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box >
  );
};

export default Home;
