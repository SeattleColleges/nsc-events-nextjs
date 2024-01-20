"use client";

import InputField from "@/components/InputFields";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Router, { useRouter } from "next/navigation";
import styles from "./signin-page.module.css";
import Image from "next/image";
import logo from "../../logo.png";

// similar to sign-up page, but we're only handling email and password 
const Signin = () => {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  
  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // handle form submission logic. Import signIn from next-auth react
    // since we're using email and password, we need to pass in credentials option
    const res = await signIn("credentials", {
      email, 
      password,
      // this prevents the defualt redirect and it's needed to render error message coming from backend
      redirect: false,
    });

    // check if the response contains an error and update error state if necessary
    if (!res?.error) {
    // if no error, we've successfully signed in, then we'll route user to their profile
    router.replace("/admin")
    } else {
      return setError(res.error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="logo" />
        </div>
        <h1 className={styles.title}>Sign In</h1>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button className={styles.submitButton} type="submit">
          Sign In
        </button>
        <div className={styles.linkContainer}>
        <p className={styles.textCenter}>
          <a href="/auth/forgot-password" className={styles.link}>
            Forgot Password
          </a>
        </p>
        <p className={styles.textCenter}>
          <a href="/auth/sign-up" className={styles.link}>
            Sign Up
          </a>
        </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;