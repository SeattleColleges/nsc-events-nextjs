"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import useAuth from '../hooks/useAuth'; 
import { Button, Box } from '@mui/material';
import Link from 'next/link';

export default function AuthProfileMenu() {
  const { user, isAuth } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Dispatch an event to notify the app about the auth state change
    window.dispatchEvent(new CustomEvent('auth-change'));
    // Redirect the user to the sign-in page
    router.push('/auth/sign-in'); 
  };

  if (isAuth) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Link href="/create-event" passHref>
          <Button color="inherit" style={{ textTransform: 'none' }}>Create Event</Button>
        </Link>
        <Button color="inherit" style={{ textTransform: 'none', marginLeft: '8px' }} onClick={handleSignOut}>
          Sign out
        </Button>
      </Box>
    );
  }
  return null;
}