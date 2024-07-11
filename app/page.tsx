"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import HomeEventsList from "@/components/HomeEventGetter";
import UpcomingEvent from "@/components/UpcomingEvent";
import { Box, Button, Typography, Grid, useMediaQuery } from "@mui/material";
import Link from "next/link";
import google_play from "public/images/google_play.png";
import blue_nsc_logo from 'public/images/blue_nsc_logo.png';
import white_nsc_logo from 'public/images/white_nsc_logo.png';
import { useTheme } from "@mui/material";

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { palette } = useTheme();

  const darkImagePath = white_nsc_logo;
  const lightImagePath = blue_nsc_logo;
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
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", pt: 4,
      }}
    >
      {!token ? (
        <Box
          sx={{
            backgroundColor: containerColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: isMobile ? "1em" : "2rem",
            borderRadius: "15px",
            width: isMobile ? "95%" : isTablet ? "550px" : "800px",
            mb: isMobile ? "7vh" : "10vh",
          }}
        >
          <Box
            sx={{
              display: "block",
              m: "0 auto",
              width: "100px",
              height: "100px",
              mb: "1rem",
            }}
          >
            <Image
              src={imagePath}
              title={"NSC Logo"}
              alt={"NSC Logo"}
              width={100}
              height={100}
            />
          </Box>
          <Typography
            fontSize={isMobile ? "1.75rem" : "2.25rem"}
            textAlign={"center"}
            padding={"1rem"}
            marginBottom={"1.5rem"}
          >
            Welcome to North Seattle College Events
          </Typography>
          <Box flex={1} display={"flex"} gap={1} marginBottom={"1em"}>
            <Link href="auth/sign-in">
              <Button variant="contained" color="primary">
                Sign In
              </Button>
            </Link>
            <Link href="auth/sign-up">
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </Link>
          </Box>
          {/* download mobile app link */}
          <Box style={{ marginBottom: "1em" }}>
            <Link href="">
              <Button variant="contained" color="secondary">
                <Image
                  src={google_play}
                  alt="google_play"
                  style={{ marginRight: "8px" }}
                />
                Download App
              </Button>
            </Link>
          </Box>
        </Box>
      ) : null}
      <Box>
        <Typography
          fontSize={isMobile ? "1.75rem" : "2.25rem"}
          textAlign={"center"}
          padding={"1rem"}
          marginBottom={isMobile ? "0.5" : "1rem"}
        >
          Upcoming Events
        </Typography>
        <Box ml={{ lg: 4  }}>
          <Grid container justifyContent="center" p={2}>
              <Grid item md={7} lg={8} xl={9} justifyContent="center">
                <HomeEventsList />
              </Grid>
              {!isMobile && !isTablet && (
              <Grid item md={5} lg={4} xl={3} justifyContent="center">
                <UpcomingEvent />
              </Grid>
              )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
