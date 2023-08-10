'use client';
import React from 'react';
import styles from './forgot-password-page.module.css';

const ForgotPassword = () => {
  return (
    <div className={styles.flexContainer}>
      <div className={styles.formContainer}>
          <h2 className={styles.title}>Forgot Password</h2>
          <form>
            <div className={styles.mb4}>
              <label htmlFor="email" className={styles.inputLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={styles.inputLabel}
                placeholder="Enter your email"/>
            </div>
            <button
            type="submit"
            className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;