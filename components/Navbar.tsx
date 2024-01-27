"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image';
import logo from '../app/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Grid, Button } from '@mui/material';
import DrawerComp from './DrawerComp'; 

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { status } = useSession();
  const isAuth = status === "authenticated";

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <a href="/"><Image src={logo} alt="logo" width={40} height={40} /></a>
          </Grid>
          <Grid item>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Grid container spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Grid item>
                <Link href="/" passHref>
                  <Button color="inherit" style={{ textTransform: 'none' }}>Home</Button>
                </Link>
              </Grid>
              {isAuth && (
                <>
                  <Grid item>
                    <Link href="/create-event" passHref>
                      <Button color="inherit" style={{ textTransform: 'none' }}>Create Event</Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button color="inherit" style={{ textTransform: 'none' }} onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
      <DrawerComp isOpen={drawerOpen} toggleDrawer={toggleDrawer} isAuth={isAuth} />
    </AppBar>
  );
};
