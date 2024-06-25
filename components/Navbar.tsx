"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import white_nsc_logo from 'public/images/white_nsc_logo.png';
import blue_vertical_nsc_logo from 'public/images/blue_vertical_nsc_logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuList, MenuItem, Tooltip, Avatar, Box, Container, Typography, Paper } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [navBarOpen, setNavBarOpen] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, isAuth } = useAuth();
  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavBarOpen(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setNavBarOpen(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new CustomEvent('auth-change'));
    router.push('/auth/sign-in');
  };

  const profileLink = () => {
    if (!user) {
      return '/profile';
    }
    if (user.role === 'admin') {
      return '/admin';
    } else if (user.role === 'creator') {
      return '/creator';
    } else {
      return '/profile';
    }
  };

  const handleProfileClick = () => {
    router.push(profileLink());
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref>
            <Image src={white_nsc_logo} alt="logo" width={40} height={40} />
          </Link>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 'auto' }}>
            <Link href="/" passHref>
              <Button color="inherit" sx={{ textTransform: 'none' }}>Events</Button>
            </Link>
            {user === null && (
              <Link href="/auth/sign-in" passHref>
                <Button color="inherit" sx={{ textTransform: 'none', pl: 2 }}>Sign In</Button>
              </Link>
            )}
          </Box>
          <Box sx={{
            display: { xs: 'flex', md: 'none' },
            ml: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <IconButton size="large" edge="end" color="inherit" onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            open={Boolean(navBarOpen)}
            anchorEl={navBarOpen}
            onClose={handleCloseNavMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                width: '100%',
                mt: 2,
              },
            }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Paper sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: 2 }}>
                  <Image src={blue_vertical_nsc_logo} alt="logo" width={80} height={200} /> {/* Adjust width and height here */}
                </Box>
                <MenuList sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/" passHref>
                      <Button color="inherit" sx={{ textTransform: 'none' }}>Events</Button>
                    </Link>
                  </MenuItem>
                  {/* Add more MenuItems as needed */}
                </MenuList>
              </Box>
            </Paper>
          </Menu>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <ThemeToggle />
          </Box>

          {isAuth && user && (
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleProfileClick}>
                  <Typography textAlign="center">My Account</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseUserMenu(); handleSignOut(); }}>
                  <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
