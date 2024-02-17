"use client";

import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { textFieldStyle } from "@/components/InputFields"

const ForgotPassword = () => {
  
  // user email state
  const [userEmail, setUserEmail] = useState({ email: "" });
  
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

  // TODO: send email to user with reset password link
  };
  
  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={6} sx={{ padding: 4, width: '100%', borderRadius: 2, mb: 2 }}>
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
    </Container>
  );
};

export default ForgotPassword;