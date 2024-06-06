"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import useAuth from '../hooks/useAuth'; 
import Link from 'next/link';
import { ListItem, ListItemText, MenuList } from '@mui/material';
import Image from 'next/image';
import logo from '../app/logo.png';
import { useRouter } from 'next/navigation';
import Profile from '@/app/profile/page';
import Admin from '@/app/admin/page';
import Creator from '@/app/creator/page';
import MenuIcon from '@mui/icons-material/Menu';
import EventDetail from '@/app/event-detail/page';


const ResponsiveAppBar = () => {
  const [navBarOpen, setNavBarOpen] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
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
          <Image src={logo} alt="logo" width={50} height={50} style={{ marginRight: '16px' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NSC
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', ml: 'auto' }}>
            <Link href="/event-detail" passHref>
              <Button color="inherit" sx={{ textTransform: 'none' }}>EVENTS</Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>
            <IconButton size="large" edge="start" color="inherit" onClick={handleOpenNavMenu}>
              <MenuIcon/>
            </IconButton>
            <Menu
              open={Boolean(navBarOpen)}
              anchorEl={navBarOpen}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuList>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="/event-detail" passHref>
                    <Button color="inherit" sx={{ textTransform: 'none' }}>Events</Button>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NSC
          </Typography>
          {isAuth && user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                  <Typography textAlign="center">Profile</Typography>
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

export default ResponsiveAppBar;

