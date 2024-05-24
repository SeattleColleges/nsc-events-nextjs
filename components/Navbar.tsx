"use client";
// import React, { useState, MouseEvent } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import logo from '../app/logo.png';
// import MenuIcon from '@mui/icons-material/Menu';
// import { AppBar, Toolbar, IconButton, Grid, Button, Typography, Box, Menu, MenuList, MenuItem } from '@mui/material';
// import DrawerComp from './DrawerComp'; 
// import useAuth from '../hooks/useAuth'; 
// import AuthProfileMenu from './AuthProfileMenu'; 
// import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
// import Avatar from '@mui/material/Avatar';
// import HomeEventsList from './HomeEventGetter';



// const pages=['Events', 'Sign in'];

// function App(){
// const [drawerOpen, setDrawerOpen] = useState<null | HTMLElement>(null);
// const { isAuth, user } = useAuth();
// const openMenu = (event: MouseEvent<HTMLElement>)=>{
//   setDrawerOpen(event.currentTarget)
// }
// const closeMenu=() => {
//   setDrawerOpen(null);
// };


//   return (

//     <AppBar position='static'>
//       <Toolbar>
//       <IconButton size='large' edge='start' color='inherit' aria-label='logo'sx={{display:{xs:'none', md:'f lex'}}}>
//         <LocalLibraryIcon/>
//       </IconButton>
//       <Typography variant='h6' component='div' sx={{flexGrow:1, display:{xs:'none', md:'flex'}}}>NSC EVENTS</Typography>
      
//       <Box sx={{display:{xs:'none', md:'flex'}}}>
//                 <Link href='/' passHref>
//                   <Button color="inherit" sx={{ textTransform: 'none' }}>Events</Button>
//                 </Link>
//                 {isAuth && (
//                 <Grid item>
//                   <AuthProfileMenu />
//                 </Grid>
//               )}
//               {!isAuth && (
//                 <Grid item>
//                   <Link href="/auth/sign-in" passHref>
//                     <Button color="inherit" sx={{ textTransform: 'none' }}>Sign In</Button>
//                   </Link>
//                 </Grid>
//               )}
//       </Box>
//       <Box sx={{display:{xs:'flex', md:'none'}}}>
//         <IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
//         <Image src={logo} alt="logo" width={50} height={50} />
//         </IconButton>
//         <Menu open={Boolean(drawerOpen)} anchorEl={drawerOpen} onClose={closeMenu} sx={{ display: { xs: 'flex', md: 'none' } }}>
//           <MenuList>
//             <MenuItem>
//                <Link href="/" passHref>
//                   <Button color="inherit" sx={{ textTransform: 'none' }}>Events</Button>
//                 </Link>
//             </MenuItem>
//             <MenuItem>
//             {isAuth && (
//                 <Grid item>
//                   <AuthProfileMenu />
//                 </Grid>
//               )}
//               {!isAuth && (
//                 <Grid item>
//                   <Link href="/auth/sign-in" passHref>
//                     <Button color="inherit" sx={{ textTransform: 'none' }}>Sign In</Button>
//                   </Link>
//                 </Grid>
//               )}
//               </MenuItem>
           
//           </MenuList>
//         </Menu>
//       </Box>
//       <IconButton size='large' edge='start' color='inherit' aria-label='logo'sx={{display:{xs:'flex', md:'none'}}}>
//         <LocalLibraryIcon/>
//       </IconButton>
//       <Typography variant='h6' component='div' sx={{flexGrow:1, display:{xs:'flex', md:'none'}}}>NSC EVENTS</Typography>
//       </Toolbar>
//     </AppBar>
    
//   );
// }

// export default App;

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../app/logo.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DrawerComp from './DrawerComp'; 
import useAuth from '../hooks/useAuth'; 
import AuthProfileMenu from './AuthProfileMenu';

const pages = ['Events', 'Sign in'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { isAuth, user } = useAuth();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;