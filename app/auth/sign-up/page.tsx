"use client";import InputField from "@/components/InputFields";import Link from "next/link";import { ChangeEventHandler, FormEventHandler, useState } from "react";import styles from "./signup-page.module.css";import Image from "next/image";import NorthSeattleLogo from "../../NorthSeattleLogo.png";// handling user's incoming information
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
  console.log(name, value); // Debugging line
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
    if (!firstName)
      {newErrors.firstName = "First name is required";}
    if (!lastName)
      {newErrors.lastName = "Last name is required";}
    if (!email) {newErrors.email = "Email is required";}
    if (!password) {newErrors.password = "Password is required";}
    if (!confirmPassword) {newErrors.confirmPassword = "Confirm password is required";}
    if (confirmPassword !== password)
      {newErrors.confirmPassword = "Passwords do not match";}

    // Update the state with the new errors
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(
      (errorMsg) => errorMsg !== ""
    );

    // If there are errors, prevent form submission
    if (hasErrors) {return;}

    // send request to backend api then log the response
    const res = await fetch("/api/auth/users", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json",
      },
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
      <div className={styles.imageWrapper}>
        <Image src={NorthSeattleLogo} alt="North Seattle College Logo" />
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.title}>User Sign Up</h1>
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
