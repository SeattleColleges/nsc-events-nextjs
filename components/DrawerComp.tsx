import React, { useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Link as MuiLink, useTheme } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import Image from "next/image";
import blue_vertical_nsc_logo from 'public/images/blue_vertical_nsc_logo.png'
import white_vertical_nsc_logo from 'public/images/white_vertical_nsc_logo.png'

interface DrawerCompProps {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isAuth: boolean;
}

const DrawerComp: React.FC<DrawerCompProps> = ({ isOpen, toggleDrawer }) => {
  const { isAuth, user } = useAuth(); 
  const router = useRouter();

  const { palette } = useTheme();

  const darkImagePath = '/images/white_vertical_nsc_logo.png';
  const lightImagePath = '/images/blue_vertical_nsc_logo.png';
  const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;
  const toggleColor = palette.mode === "dark" ? palette.primary.contrastText : palette.primary.main;


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('.MuiDrawer-root')) {
        return;
      }
      toggleDrawer(false)(event as unknown as React.MouseEvent);
    }
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen, toggleDrawer]);

  
  const handleSignOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Dispatch an event to notify the app about the auth state change
    window.dispatchEvent(new CustomEvent('auth-change'));
    // Close the drawer
    toggleDrawer(false);
    // Redirect the user to the sign-in page
    router.push('/auth/sign-in');
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={(toggleDrawer(false))}>
      <Box
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
        sx={{ width: 250 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, mt: 2 }}>
          <Image
            src={imagePath.src}
            alt="North Seattle College Logo"
            width={150}
            height={50}
            style={{ borderRadius: "10px" }}
          />
        </Box>
        <List sx={{ m: 1 }}>
        <ListItem component={MuiLink} href="/" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <MuiLink sx={{ textDecoration: 'none' }}>
              <ListItemText primary="Events" />
            </MuiLink>
          </ListItem>
          {isAuth && user ? (
            <Box display="flex" flexDirection="column" alignItems="start">
              <ListItem component={MuiLink} href="/profile" onClick={() => toggleDrawer(false)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <ListItemText primary="Profile" />
              </ListItem>
              {user.role === 'admin' ? (
                <ListItem component={MuiLink} href="/admin" onClick={() => toggleDrawer(false)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <ListItemText primary="My Account" />
                </ListItem>
              ) : user.role === 'creator' ? (
                <ListItem component={MuiLink} href="/creator" onClick={() => toggleDrawer(false)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <ListItemText primary="My Account" />
                </ListItem>
              ) : null}
              <ListItem component={MuiLink} href="/auth/sign-in" onClick={handleSignOut} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <ListItemText primary="Sign Out" />
              </ListItem>
            </Box>
          ) : (
            <ListItem component={MuiLink} href="/auth/sign-in" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <ListItemText primary="Sign In" />
            </ListItem>
          )}
        </List>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2, color: toggleColor }}>
          <ThemeToggle />
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerComp;