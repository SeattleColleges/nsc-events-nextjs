"use client";

import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { textFieldStyle } from "@/components/InputFields";
import Image from "next/image";
import blue_vertical_nsc_logo from 'public/images/blue_vertical_nsc_logo.png';
import white_vertical_nsc_logo from 'public/images/white_vertical_nsc_logo.png';
import { useTheme } from "@mui/material";

const ForgotPassword = () => {
  const { palette } = useTheme();
  const darkImagePath = white_vertical_nsc_logo;
  const lightImagePath = blue_vertical_nsc_logo;
  const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;

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
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Simulating email validation logic
    if (email === "valid@example.com") {
      setMessage("An email with a password reset link has been sent to your email address.");
    } else {
      setMessage("Email address is invalid, please use a registered email address.");
    }

    setOpen(true);
  };

  // handle close event
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={6} sx={{ padding: 4, width: '100%', borderRadius: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <Image
            src={imagePath.src}
            alt="North Seattle College Logo"
            width={150}
            height={50}
            style={{ borderRadius: "10px" }}
          />
        </Box>
        <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: 2 }}>
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
