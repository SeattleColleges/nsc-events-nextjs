"use client";

import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import google_play from "./google_play.png";
import HomeEventsList from "@/components/HomeEventGetter";
import UpcomingEvent from "@/components/UpcomingEvent";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import blue_nsc_logo from 'public/images/blue_nsc_logo.png'
import white_nsc_logo from 'public/images/white_nsc_logo.png'
import { useTheme } from "@mui/material";

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { palette } = useTheme();

  const darkImagePath = white_nsc_logo;
  const lightImagePath = blue_nsc_logo;
  const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";

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
    <>
      {token ? (
        <Box>
          <Typography
              fontSize={"2.25rem"}
              textAlign={"center"}
              padding={"1rem"}
              marginTop={"1rem"}
              marginBottom={"1rem"}
          >Upcoming Events
          </Typography>
          <Box className={styles.eventContainer}>
            <Box className={styles.homeEventsList}>
              <HomeEventsList />
            </Box>
            <Box className={styles.upcomingEvent}>
              <UpcomingEvent />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={styles.welcomeContainer}>
          <Box className={styles.formContainer} sx={{ backgroundColor: containerColor }}>
            <Box className={styles.logoContainer}>
            <Image src={imagePath} title={"NSC Logo"} alt={"NSC Logo"} width={100} height={100} />
            </Box>
            <Typography
                fontSize={"2.25rem"}
                textAlign={"center"}
                padding={"1rem"}
                marginBottom={"1.5rem"}
            >Welcome to North Seattle College Events
            </Typography>
            <Box
                flex={1}
                display={"flex"}
                gap={1}
                marginBottom={"1em"}
            >
              <Link href="auth/sign-in">
                <Button
                    variant="contained"
                    color="primary">Sign In
                </Button>
              </Link>
              <Link href="auth/sign-up">
                  <Button 
                      variant="contained"
                      color="primary">Sign Up
                  </Button>
              </Link>
            </Box>
            {/* download mobile app link */}
            <Box style={{ marginBottom:"1em" }}>
                <Link href="">
                  <Button
                      variant="contained"
                      color="secondary">
                    <Image src={google_play} alt="google_play" />
                    Download App
                  </Button>
                </Link>
            </Box>
          </Box>
            <Typography
                fontSize={"2.25rem"}
                textAlign={"center"}
                padding={"1rem"}
                marginBottom={"1rem"}
            >Upcoming Events
            </Typography>
          <Box className={styles.eventContainer}>
            <Box className={styles.homeEventsList}>
              <HomeEventsList />
            </Box>
            <Box className={styles.upcomingEvent}>
              <UpcomingEvent />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Home;
