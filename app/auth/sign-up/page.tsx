"use client";

import { ChangeEventHandler, FormEventHandler, use, useState } from "react";
import {  Container,
  Paper,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { textFieldStyle } from "@/components/InputFields"
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from "next/image";
import { validateSignUp } from "./validateSignUp";
// TODO determine if this is the correct logo
import NorthSeattleLogo from "../../NorthSeattleLogo.png";
import React from "react";
import { signUp } from "./signupApi";

interface State extends SnackbarOrigin {
  open: boolean;
}

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

  // Set initial state for user info
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Set initial state for errors
  const [errors, setErrors] = useState<Partial<typeof userInfo>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Set initial state for snackbar message
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const { firstName, lastName, email, password, confirmPassword } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setErrors({ ...errors, [name]: "" });
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Validate user input
    let errors = validateSignUp(userInfo);
    setErrors(errors);
    const hasErrors = Object.values(errors).some((error) => error !== "");
    // If there are errors, do not submit the form
    if (hasErrors) {
      return;
    }

    // Generate payload for sign up
    const payload = {
      firstName,
      lastName,
      email,
      password,
      role: "user",
    };

    // Call the sign up API
    let response = await signUp(payload);
    if (response.status === "success") {
      setSnackBarMessage(response.message);
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      setTimeout(() => {
        // TODO use router to navigate to home page
        window.location.href = "/";
      }, 2000);
    } else {
      setSnackBarMessage(response.message);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{ padding: 4, width: "100%", borderRadius: 2, mb: 2 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={NorthSeattleLogo.src}
            alt="North Seattle College Logo"
            width={150}
            height={50}
            style={{ borderRadius: "10px" }}
          />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            InputProps={{ style: textFieldStyle.input }}
            InputLabelProps={{ style: textFieldStyle.label }}
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
            InputProps={{ style: textFieldStyle.input }}
            InputLabelProps={{ style: textFieldStyle.label }}
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
            InputProps={{ style: textFieldStyle.input }}
            InputLabelProps={{ style: textFieldStyle.label }}
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
            InputLabelProps={{ style: textFieldStyle.label }} 
            InputProps={{
              style: textFieldStyle.input, 
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
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
            InputLabelProps={{ style: textFieldStyle.label }} 
            InputProps={{
              style: textFieldStyle.input, 
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            style={{ textTransform: "none" }}
            color="secondary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
          <Box textAlign="center" sx={{ mt: 2 }}>
            <MuiLink href="/auth/sign-in" variant="body2">
              Already have an account? Log In
            </MuiLink>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={Boolean(snackBarMessage)}
        autoHideDuration={6000}
        onClose={() => setSnackBarMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={snackBarMessage}
      />
    </Container>
  );
};

export default SignUp;
