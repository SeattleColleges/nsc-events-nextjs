"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../logo.png";
import { Container, Paper, Box, TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import { textFieldStyle } from "@/components/InputFields"

// similar to sign-up page, but we're only handling email and password 
const Signin = () => {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  
  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Fetch sign in
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!res.ok) {
      alert("Invalid email or password"); // error message for now
      throw new Error(await res.text());
    }
    const { token } = await res.json();
    const userRole = JSON.parse(atob(token.split(".")[1])).role; // decode token to get user role
    localStorage.setItem("token", token);
    // Redirect to user page
    if (userRole === "admin") {
      router.push("/admin");
    } else if (userRole === "creator") {
      router.push("/creator");
    } else {
      router.push("/profile");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ padding: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2, mb: 2 }}>
        <Image src={logo} alt="logo" width={100} height={30} style={{ marginBottom: '20px', borderRadius: '10px' }} />
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
            <MuiLink href="/auth/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signin;