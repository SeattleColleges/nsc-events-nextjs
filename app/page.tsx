"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head"; // Import the Head component
import styles from "./home.module.css";
import Image from "next/image";
import logo from "./logo.png";
import CircularProgress from "@mui/material/CircularProgress";
import google_play from "./google_play.png";
import HomeEventsList from "@/components/HomeEventGetter";
import UpcomingEvent from "@/components/UpcomingEvent";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>North Seattle College Events</title>
        <meta name="description" content="Stay updated with the latest events and happenings at North Seattle College." />
        <meta property="og:title" content="North Seattle College Events" />
        <meta property="og:description" content="Discover events, connect with others, and engage in campus activities." />
        <meta property="og:image" content="URL_TO_IMAGE_FOR_SOCIAL_MEDIA" />
        <meta property="og:type" content="website" />
      </Head>
      {token ? (
        <div className={styles.welcomeContainer}>
          <h1 className={styles.title}>
            Upcoming Events
          </h1>
          <div className={styles.eventContainer}>
            <div className={styles.homeEventsList}>
              <HomeEventsList />
            </div>
            <div className={styles.upcomingEvent}>
              <UpcomingEvent />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.welcomeContainer}>
          <div className={styles.formContainer}>
            <div className={styles.logoContainer}>
              <Image src={logo} alt="logo" />
            </div>
            <h1 className={styles.title}>
              Welcome to North Seattle College Events
            </h1>
            <div className={styles.buttonContainer}>
              <a href="auth/sign-in">
                <button className={styles.loginButton}>Sign In</button>
              </a>
              <a href="auth/sign-up">
                <button className={styles.signUpButton}>Sign Up</button>
              </a>
            </div>
            {/* download mobile app link */}
            <div className={styles.downloadContainer}>
              <p className="textCenter">
                <a href="" className={styles.link}>
                  <button className={styles.downloadButton}>
                    <Image src={google_play} alt="google_play" />
                    Download App
                  </button>
                </a>
              </p>
            </div>
          </div>
          <h1 className={styles.title}>
            Upcoming Events
          </h1>
          <div className={styles.eventContainer}>
            <div className={styles.homeEventsList}>
              <HomeEventsList />
            </div>
            <div className={styles.upcomingEvent}>
              <UpcomingEvent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
