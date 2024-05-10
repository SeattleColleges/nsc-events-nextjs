"use client";
import React, { useState, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../app/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Grid, Button, Typography, Box, Menu, MenuList, MenuItem } from '@mui/material';
import DrawerComp from './DrawerComp'; 
import useAuth from '../hooks/useAuth'; 
import AuthProfileMenu from './AuthProfileMenu'; 
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const pages=['Events', 'Sign in'];

function App(){
const [drawerOpen, setDrawerOpen] = useState<null | HTMLElement>(null);
const { isAuth, user } = useAuth();
const openMenu = (event: MouseEvent<HTMLElement>)=>{
  setDrawerOpen(event.currentTarget)
}
const closeMenu=() => {
  setDrawerOpen(null);
};

  return (

    <AppBar position='static'>
      <Toolbar>
      <IconButton size='large' edge='start' color='inherit' aria-label='logo'sx={{display:{xs:'none', md:'f lex'}}}>
        <LocalLibraryIcon/>
      </IconButton>
      <Typography variant='h6' component='div' sx={{flexGrow:1, display:{xs:'none', md:'flex'}}}>NSC EVENTS</Typography>
      
      <Box sx={{display:{xs:'none', md:'flex'}}}>
                <Link href="/" passHref>
                  <Button color="inherit" sx={{ textTransform: 'none' }}>Events</Button>
                </Link>
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
      </Box>
      <Box sx={{display:{xs:'flex', md:'none'}}}>
        <IconButton size='large' edge='start' color='inherit' onClick={openMenu}>
          <MenuIcon/>
        </IconButton>
        <Menu open={Boolean(drawerOpen)} anchorEl={drawerOpen} onClose={closeMenu} sx={{ display: { xs: 'flex', md: 'none' } }}>
          <MenuList>
            <MenuItem>
               <Link href="/" passHref>
                  <Button color="inherit" sx={{ textTransform: 'none' }}>Events</Button>
                </Link>
            </MenuItem>
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
           
          </MenuList>
        </Menu>
      </Box>
      <IconButton size='large' edge='start' color='inherit' aria-label='logo'sx={{display:{xs:'flex', md:'none'}}}>
        <LocalLibraryIcon/>
      </IconButton>
      <Typography variant='h6' component='div' sx={{flexGrow:1, display:{xs:'flex', md:'none'}}}>NSC EVENTS</Typography>
      </Toolbar>
    </AppBar>
    
  );
}

export default App;