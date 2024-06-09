"use client";

import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Image from "next/image";
import blue_logo from "./blue_logo.png";
import CircularProgress from "@mui/material/CircularProgress";
import google_play from "./google_play.png";
import HomeEventsList from "@/components/HomeEventGetter";
import UpcomingEvent from "@/components/UpcomingEvent";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          <Box className={styles.formContainer}>
            <Box className={styles.logoContainer}>
              <Image src={blue_logo} alt="logo" />
            </Box>
            <Typography
                className={styles.title}
                style={{ marginBottom: '0.5em' }}
                variant={'h2'}
            >
              Welcome to North Seattle College Events
            </Typography>
            <Box
                flex={1}
                display={"flex"}
                gap={1}
                marginBottom={"1em"}
            >
              <Link href="auth/sign-in">
                <Button className={styles.loginButton}
                        variant="contained"
                        color="primary">
                    Sign In
                </Button>
              </Link>
              <Link href="auth/sign-up">
                  <Button className={styles.loginButton}
                          variant="contained"
                          color="primary">
                      Sign Up
                  </Button>
              </Link>
            </Box>
            {/* download mobile app link */}
            <Box style={{ marginBottom:"1em" }}>
                <Link href=""
                      className={styles.link}
                >
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
                className={styles.title}
                variant='h2'
                fontSize={'xxx-large'}
                style={{ marginBottom:"1em" }}
            >
                Upcoming Events
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
