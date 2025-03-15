"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import HomeEventsList from "@/components/HomeEventGetter";
import UpcomingEvent from "@/components/UpcomingEvent";
import { Box, Button, CardMedia, Typography, useMediaQuery } from "@mui/material";
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
  const darkImagePath = '/images/north-seattle-tree-frogs.png';
  const lightImagePath = '/images/north-seattle-tree-frogs.png';

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
    <Box sx={{ flexGrow: 1, height: "100vh", width: "100vw", p: 2 }}>
      <Grid container spacing={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: (isMobile || isTablet) ? "column-reverse" : "row",
          }}>
          <Grid
            size={(isMobile || isTablet) ? 12 : 7}
            p={2}
            sx={{
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
              width: (isMobile || isTablet) ? "100vw" : "100%",
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
                overflowY: "scroll",
              }}
            >
              <CardMedia>
                <Image
                  src={imagePath}
                  alt="NSC Logo"
                  width={isMobile ? 300 : 500}
                  height={isMobile ? 150 : 250}
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
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <UpcomingEvent /> */}
                <HomeEventsList />
              </Box>
            </Box>
          </Grid>
          <Grid
            size={(isMobile || isTablet) ? 12 : 5}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textWrap: "balance",
              minWidth: "400px",
            }}
            mb={4}
          >
            {!token ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mt: 6,
                }}>
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
            ) : null}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default Home;
