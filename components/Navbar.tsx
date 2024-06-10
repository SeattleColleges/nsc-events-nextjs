"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import white_nsc_logo from 'public/images/white_nsc_logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Grid, Button, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import DrawerComp from './DrawerComp'; 
import useAuth from '../hooks/useAuth'; 
import AuthProfileMenu from './AuthProfileMenu'; 
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuth, user } = useAuth();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && 'key' in event && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };


  const list = () => (
    <div role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem component={Link} href='/'>
          <ListItemText primary="Events" />
        </ListItem>
        {isAuth ? (
          <ListItem button>
            <AuthProfileMenu />
          </ListItem>
        ) : (
          <ListItem component={Link} href='/auth/sign-in'>
            <ListItemText primary="Sign In" />
          </ListItem>
        )}
      </List>
    </div>
  );


  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link href="/" passHref>
              <Image src={white_nsc_logo} alt="logo" width={40} height={40} />
            </Link>
          </Grid>
          <Grid item>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }} 
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
