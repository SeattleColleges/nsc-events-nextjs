"use client";

import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper, useMediaQuery, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { textFieldStyle } from "@/components/InputFields";
import Image from "next/image";
import { useTheme } from "@mui/material";

const URL = process.env.NSC_EVENTS_PUBLIC_API_URL;

const ForgotPassword = () => {
  const { palette } = useTheme();

  const darkImagePath = '/images/white_nsc_logo.png';
  const lightImagePath = '/images/blue_nsc_logo.png';
  const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // user email state
  const [userEmail, setUserEmail] = useState({ email: "" });

  // success and error message states
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // destructure email from userEmail state
  const { email } = userEmail;

  // handle change event
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setUserEmail({ ...userEmail, [name]: value });
  };

  // handle submit event
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // POST request to check for email
    const res = await fetch(`${URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
      }),
    });
    
    // email validation logic
    if (!res.ok) {
      setMessage("Email address is invalid, please use a registered email address.");
    } else if(res.ok) {
      setMessage("An email with a password reset link has been sent to your email address.");
    }

    setOpen(true);
  };

  // handle close event
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" 
      maxWidth="xs" 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        height: '100vh',
        mt: isMobile ? -16 : isTablet ? -14 : -18
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          padding: 4, 
          width: '100%', 
          borderRadius: 2, 
          mb: 2 
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
        <Typography component="h1" variant="h6" textAlign="center" sx={{ mb: 2 }}>
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
            InputProps={{ style: textFieldStyle.input }}
            InputLabelProps={{ style: textFieldStyle.label }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            style={{ textTransform: 'none' }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{message.includes("invalid") ? "Error" : "Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ForgotPassword;
