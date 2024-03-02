import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box, Link as MuiLink } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

interface DrawerCompProps {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isAuth: boolean;
}

const DrawerComp: React.FC<DrawerCompProps> = ({ isOpen, toggleDrawer }) => {
  const { isAuth, user } = useAuth(); 
  const router = useRouter();
  
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
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <Box
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
        sx={{ width: 150 }} // fixed width for the drawer
      >
        <List>
        <ListItem component={MuiLink} href="/">
            <ListItemText primary="Home" />
          </ListItem>
          {isAuth && user ? (
            <Box display="flex" flexDirection="column" alignItems="start">
              {user.role === 'admin' ? (
                <ListItem component={MuiLink} href="/admin" onClick={() => toggleDrawer(false)}>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              ) : user.role === 'creator' ? (
                <ListItem component={MuiLink} href="/creator" onClick={() => toggleDrawer(false)}>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              ) : null}
              <ListItem component={MuiLink} href="/auth/sign-in" onClick={handleSignOut}>
                <ListItemText primary="Sign Out" />
              </ListItem>
            </Box>
          ) : (
            <ListItem component={MuiLink} href="/auth/sign-in">
              <ListItemText primary="Sign In" />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerComp;