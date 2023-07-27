import React from 'react';
import styles from './login-page.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        <form>
          <div className={styles.mb4}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.inputField}
              placeholder="Enter your email"/>
          </div>
          <div className={styles.mb4}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              placeholder="Enter your password"/>
          </div>
          <button
            type="submit"
            className={styles.submitButton}>
            Sign In
          </button>
        </form>
        <p className={styles.textCenter}>
          <a href="/api/auth/forgot-password" className={styles.link}>
            Forgot Password
          </a>
        </p>
        <p className={styles.textCenter}>
          <a href="/api/auth/sign-up" className={styles.link}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
