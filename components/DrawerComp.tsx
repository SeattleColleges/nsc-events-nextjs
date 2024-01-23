import React, { Component } from 'react';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import Link from 'next/link';
import { signOut } from "next-auth/react";

interface DrawerCompProps {
  isOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isAuth: boolean;
}

class DrawerComp extends Component<DrawerCompProps> {
  render() {
    const { isOpen, toggleDrawer, isAuth } = this.props;

    return (
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem onClick={toggleDrawer(false)}>
            <Link href="/" passHref>
              <ListItemText primary={<Button color="inherit" style={{ textTransform: 'none' }}>Home</Button>} />
            </Link>
          </ListItem>
          {isAuth && (
            <>
              <ListItem onClick={toggleDrawer(false)}>
                <Link href="/create-event" passHref>
                  <ListItemText primary={<Button color="inherit" style={{ textTransform: 'none' }}>Create Event</Button>} />
                </Link>
              </ListItem>
              <ListItem onClick={() => { toggleDrawer(false); signOut({ callbackUrl: "/" }); }}>
                <ListItemText primary={<Button color="inherit" style={{ textTransform: 'none' }}>Sign out</Button>} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    );
  }
}

export default DrawerComp;
