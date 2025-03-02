"use client";

import { ChangeEventHandler, FormEventHandler, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Container, Paper, Box, TextField, Button, Typography, Link as MuiLink, useMediaQuery } from "@mui/material";
import { textFieldStyle } from "@/components/InputFields";
import { useTheme } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/utility/msal/authConfig";
import { callMsGraph, getCalendarEvents, getUserPhoto } from "@/utility/msal/graph";

const URL = process.env.NSC_EVENTS_PUBLIC_API_URL;
if (URL?.includes('localhost')) {
  console.log('Dev API Address: ', URL);
}

const Signin = () => {
  const { instance } = useMsal();
  const [userData, setUserData] = useState("");
  const [photo, setPhoto] = useState();
	const [eventList, setEventList] = useState([]);
  const { palette } = useTheme();
  const darkImagePath = '/images/white_nsc_logo.png';
  const lightImagePath = '/images/blue_nsc_logo.png';
  const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;

  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      alert("Invalid email or password");
      throw new Error(await res.text());
    }

    const { token } = await res.json();
    const userRole = JSON.parse(atob(token.split(".")[1])).role;
    localStorage.setItem("token", token);
    window.dispatchEvent(new CustomEvent('auth-change'));

    if (userRole === "admin") {
      router.push("/admin");
    } else if (userRole === "creator") {
      router.push("/creator");
    } else {
      router.push("/");
    }
  };

  // Handle MSAL login
	const handleMSALLogin = async () => {
		try {
			const response = await instance.loginPopup(loginRequest);
			// For use in Postman
			console.log(`token: ${response.accessToken}`);
		} catch (error) {
			console.error(error);
		}
	};

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
        mt: isMobile ? -8 : isTablet ? -6 : -10,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 2,
          }}
        >
          <Image
            src={imagePath}
            alt="North Seattle College Logo"
            width={150}
            height={50}
            style={{ borderRadius: "10px" }}
          />
        </Box>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userInfo.email}
            onChange={handleChange}
            InputProps={{ style: textFieldStyle.input }}
            InputLabelProps={{ style: textFieldStyle.label }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userInfo.password}
            onChange={handleChange}
            InputProps={{ style: textFieldStyle.input }}
            InputLabelProps={{ style: textFieldStyle.label }}
          />
          <Button
            style={{ textTransform: 'none' }}
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}
          <Box textAlign="center">
            <MuiLink href="/auth/forgot-password" variant="body2">
              Forgot password?
            </MuiLink>
          </Box>
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Don&apos;t have an account?&nbsp;
              <MuiLink href="/auth/sign-up" variant="body2">
                {"Sign Up"}
              </MuiLink>
            </Typography>
          </Box>
        </Box>
        <br />
        <Typography variant="body2" color="textSecondary" align="center">
          Use your NSC email address to sign in
        </Typography>
        <Button
          type="button"
          onClick={handleMSALLogin} // Use this function to trigger MSAL login
          sx={{ mt: 3, mb: 2 }}
          style={{ textTransform: 'none' }}
          color="primary"
          fullWidth
          variant="contained"
        >
          Sign in with Outlook
        </Button>
      </Paper>
    </Container>
  );
};

export default Signin;
