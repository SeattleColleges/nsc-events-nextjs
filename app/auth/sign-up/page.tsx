"use client";import InputField from "@/components/InputFields";import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "./signup-page.module.css";
import Image from "next/image";

// TODO determine if this is the correct logo
import NorthSeattleLogo from "../../NorthSeattleLogo.png";
// Image by show password by Daniel T. from https://thenounproject.com/browse/icons/term/show-password/ Title = show password Icons used under CC BY 3.0
// TODO: Replace with a different icon
import passwordIcon from "../../showpassword.png";


const SignUp = () => {
  // Set initial state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Set initial state for user info and errors
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Set initial state for errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    // TODO add more validation
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
    } else if (password.length < 10) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (password.length > 20) {
      newErrors.password = "Password must be less than 20 characters";
    } else if (password.search(/[a-z]/i) < 0) {
      newErrors.password = "Password must contain at least one letter";
    } else if (password.search(/[0-9]/) < 0) {
      newErrors.password = "Password must contain at least one digit";
    } else if (password.search(/[!@#$%^&*]/) < 0) {
      newErrors.password =
        "Password must contain at least one special character";
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

    // TODO: handle role better - probably need a different route for users vs admins
    const payload = {
      name: firstName + " " + lastName,
      email,
      password,
      role: "user",
    };
    // send request to backend api then log the response
    // TODO: Move this to a service file
    // TODO: Use correct URL
    // TODO: Check email is unique first then send request
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
        console.log("Response from server:", data);
      }
      // TODO Should this be a token or a cookie or something else?
      localStorage.setItem("token", data.token);
      console.log("Token:", data.token);
      alert("Sign up successful!");
      // TODO redirect to profile page or home page
      // QUESTION: Are we using next.js routing or something else?
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
          name="password"
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          error={errors.password}
          togglePasswordVisibility={togglePasswordVisibility}
          icon={
            <Image
              src={passwordIcon}
              alt="Show Password"
              color="white"
              onClick={togglePasswordVisibility}
              width={40}
              height={40}
              // TODO: Fix this
              className="translate-x-3 translate-y-4"
            />
          }
        />
        <InputField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={
            <Image
              src={passwordIcon}
              alt="Show Password"
              color="white"
              onClick={toggleConfirmPasswordVisibility}
              width={40}
              height={40}
              // TODO: Fix this
              className="translate-x-3 translate-y-4"
            />
          }
        />
        <button className={styles.submitButton} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
