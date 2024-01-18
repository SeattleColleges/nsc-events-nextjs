"use client";import InputField from "@/components/InputFields";import Link from "next/link";import { ChangeEventHandler, FormEventHandler, useState } from "react";import styles from "./signup-page.module.css";
import Image from "next/image";
import NorthSeattleLogo from "../../NorthSeattleLogo.png";


const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handling error messages
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Destructure the state values for easier access
  const { firstName, lastName, email, password, confirmPassword } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setErrors({ ...errors, [name]: "" });
    setUserInfo({ ...userInfo, [name]: value });
  };

  // handle submit only fires when user clicks sign up
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Assume no errors initially
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate inputs before form submission
    if (!firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Update the state with the new errors
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(
      (errorMsg) => errorMsg !== ""
    );

    // If there are errors, prevent form submission
    if (hasErrors) {
      return;
    }

    const payload = {
      name: firstName + " " + lastName,
      email,
      password,
      role: "user",
    };
    // send request to backend api then log the response
    // TODO: Move this to a service file
    // TODO: Use correct URL
    const URL = "http://159.223.203.135:3000/api/auth/signup";
    try {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      } else {
        console.log("Response from server:", data);}
        localStorage.setItem("token", data.token);
        console.log("Token:", data.token);
        alert("Sign up successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Sign up failed!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image src={NorthSeattleLogo} alt="North Seattle College Logo" />
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign Up</h1>
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={userInfo.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          type="name"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          error={errors.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <button className={styles.submitButton} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
