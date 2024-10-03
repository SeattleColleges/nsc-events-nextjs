"use client";
import { ChangeEventHandler, FormEventHandler, use, useState } from "react";
import {
  Container,
  Paper,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Link as MuiLink,
  useMediaQuery,
  SnackbarContent,
} from "@mui/material";
import { textFieldStyle } from "@/components/InputFields"
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Image from "next/image";
import { validateSignUp } from "./validateSignUp";
import React from "react";
import { signUp } from "./signupApi";
import blue_vertical_nsc_logo from 'public/images/blue_vertical_nsc_logo.png'
import white_vertical_nsc_logo from 'public/images/white_vertical_nsc_logo.png'
import { useTheme } from "@mui/material";

interface State extends SnackbarOrigin {
  open: boolean;
}

const SignUp = () => {
  const { palette } = useTheme();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const darkImagePath = '/images/white_nsc_logo.png';
  const lightImagePath = '/images/blue_nsc_logo.png';
  const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;

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
    pronouns: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Set initial state for errors
  const [errors, setErrors] = useState<Partial<typeof userInfo>>({
    firstName: "",
    lastName: "",
    pronouns: "",
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

  const { firstName, lastName, pronouns, email, password, confirmPassword } = userInfo;

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
      pronouns,
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
        mt: isMobile ? 4 : isTablet ? 8 : 2,
        width: isMobile ? '95%' : 'auto', 
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
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <Image
              src={imagePath}
              alt="North Seattle College Logo"
              width={150}
              height={50}
              style={{ borderRadius: "10px" }}
            />
          </Box>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <TextField
            fullWidth
            margin={isMobile ? "dense" : "normal"}
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
            margin={isMobile ? "dense" : "normal"}
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
            margin={isMobile ? "dense" : "normal"}
            label="Pronouns"
            name="pronouns"
            value={pronouns}
            onChange={handleChange}
            error={Boolean(errors.pronouns)}
            helperText={errors.pronouns}
            InputProps={{ style: textFieldStyle.input }}
            InputLabelProps={{ style: textFieldStyle.label }}
          />
          <TextField
            fullWidth
            margin={isMobile ? "dense" : "normal"}
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
            margin={isMobile ? "dense" : "normal"}
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
                  <IconButton
                    aria-label="toggle password"
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
            margin={isMobile ? "dense" : "normal"}
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
                  <IconButton
                    aria-label="toggle password"
                    onClick={toggleConfirmPasswordVisibility}
                  >
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
            <Typography variant="body2">
              Already have an account?{" "}
              <MuiLink href="/auth/sign-in" variant="body2">
                {"Sign In"}
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={Boolean(snackBarMessage)}
        autoHideDuration={6000}
        onClose={() => setSnackBarMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={snackBarMessage}
      >
        <SnackbarContent message={snackBarMessage} sx={{ backgroundColor: "white", color: "black" }} />
      </Snackbar>
    </Container>
  );
};

export default SignUp;
