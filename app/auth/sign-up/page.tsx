"use client";
import InputField from "@/components/InputFields";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from './signup-page.module.css';

const SignUp = () => {
  // handling user's incoming info
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    // updating user's info 
    setUserInfo({ ...userInfo, [name]: value });
  };

  // handle submit only fires when user clicks sign up
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // prevent the default behavior
    e.preventDefault();

    // send request to backend api then log the response
    const res = await fetch("/api/auth/users", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json"
      }
    });
    try {
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error parson JSON response:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign Up</h1>
        <InputField
          label="Name"
          type="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
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
          Sign Up
        </button>
        <p className={styles.textCenter}>
          Already have an account?{" "}
          <a href="sign-in" className={styles.link}>
            Log In
          </a>
        </p>
        
      </form>
    </div>
  );
};

export default SignUp;