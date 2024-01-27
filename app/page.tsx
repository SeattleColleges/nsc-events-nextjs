import React from "react";
import styles from "./home.module.css";
import Image from "next/image";
import logo from "./logo.png";
import google_play from "./google_play.png";
import EventsList from "../components/EventGetter";

const Home = () => {
  return (
      <>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={styles.logoContainer}>
              <Image src={logo} alt="logo"/>
            </div>
            <h1 className={styles.title}>Welcome to North Seattle College Events</h1>
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
                    <Image src={google_play} alt="google_play"/>
                    Download App
                  </button>
                </a>
              </p>
            </div>
          </div>

        </div>
        <div>
          <EventsList/>
        </div>
      </>
  );
};

export default Home;