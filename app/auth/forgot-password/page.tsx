"use client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "./forgot-password-page.module.css";
import InputField from "@/components/InputFields";

const ForgotPassword = () => {
  
  // user email state
  const [userEmail, setUserEmail] = useState({email: ""});
  
  // destructure email from userEmail state
  const {email} = userEmail;

  // handle change event
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({target}) => {
    const {name, value} = target;
    setUserEmail({...userEmail, [name]: value});
  };
  
  // handle submit event
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

  // TODO: send email to user with reset password link
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Forgot Password</h1>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
