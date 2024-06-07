"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import white_logo from '../app/white_logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Grid, Button } from '@mui/material';
import DrawerComp from './DrawerComp'; 
import useAuth from '../hooks/useAuth'; 
import AuthProfileMenu from './AuthProfileMenu'; 
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuth, user } = useAuth();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link href="/" passHref>
              <Image src={white_logo} alt="logo" width={40} height={40} />
            </Link>
          </Grid>
          <Grid item>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }} 
            >
              <MenuIcon />
            </IconButton>
            <Grid container spacing={2} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/* Home Link remains outside AuthProfileMenu for general access */}
              <Grid item>
                <Link href="/" passHref>
                  <Button color="inherit" sx={{ textTransform: 'none' }}>Events</Button>
                </Link>
              </Grid>
              {/* AuthProfileMenu contains Create Event and Sign Out actions */}
              {isAuth && (
                <Grid item>
                  <AuthProfileMenu />
                </Grid>
              )}
              {!isAuth && (
                <Grid item>
                  <Link href="/auth/sign-in" passHref>
                    <Button color="inherit" sx={{ textTransform: 'none' }}>Sign In</Button>
                  </Link>
                </Grid>
              )}
              <Grid item>
                <ThemeToggle />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
      <DrawerComp isOpen={drawerOpen} toggleDrawer={toggleDrawer} isAuth={isAuth} />
    </AppBar>
  );
};