"use client";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Container,
  Paper,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { blue, green } from "@mui/material/colors";
import Link from "next/link";
import Image from 'next/image';

// TODO determine if this is the correct logo
import NorthSeattleLogo from "../../NorthSeattleLogo.png";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});

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
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
        <Paper elevation={6} sx={{ padding: 4, width: '100%', borderRadius: 2, mb: 2 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image
              src={NorthSeattleLogo.src}
              alt="North Seattle College Logo"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
            />
            <h1>Sign Up</h1>
            <TextField
              fullWidth
              margin="normal"
              label="First Name"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleChange}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button fullWidth variant="contained" style={{ textTransform: 'none' }} color="secondary" type="submit" sx={{ mt: 2 }}>
              Sign Up
            </Button>
            <Link href="/auth/sign-in" passHref>
              <Button component="a" fullWidth style={{ textTransform: 'none' }}>
                Already have an account? Log In
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;