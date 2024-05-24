
import React from 'react';
import Link from 'next/link';
import { Box, List, ListItem, ListItemText, Drawer, Link as MuiLink, Grid, Button } from '@mui/material';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth'; // Assuming you have a hook for authentication
import AuthProfileMenu from './AuthProfileMenu';

interface NavbarProps {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleDrawer }) => {
  const { isAuth, user } = useAuth(); // Assuming you have a custom hook for authentication
  const router = useRouter();

  const handleSignOut = () => {
    
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <Box
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
        sx={{ width: 150 }}
      >
        <List>
          <ListItem component={Link} href="/">
            <ListItemText primary="Home" />
          </ListItem>
          {isAuth && user ? (
            <Box display="flex" flexDirection="column" alignItems="start">
              {user.role === 'admin' ? (
                <ListItem component={Link} href="/admin">
                  <ListItemText primary="Admin Event" />
                </ListItem>
              ) : user.role === 'creator' ? (
                <ListItem component={Link} href="/creator">
                  <ListItemText primary="Creator Event" />
                </ListItem>
              ) : null}
              <ListItem component={MuiLink} href="#" onClick={handleSignOut}>
                <ListItemText primary="Sign Out" />
              </ListItem>
            </Box>
          ) : (
            <ListItem component={Link} href="/auth/sign-in">
              <ListItemText primary="Sign In" />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Navbar;



