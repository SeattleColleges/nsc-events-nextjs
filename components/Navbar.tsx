"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
  Tooltip,
  Avatar,
  Menu,
  Typography,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DrawerComp from "./DrawerComp";
import useAuth from "../hooks/useAuth";
import AuthProfileMenu from "./AuthProfileMenu";
import ThemeToggle from "./ThemeToggle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuth, user } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    router.push("/profile");
    toggleDrawer(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new CustomEvent("auth-change"));
    router.push("/auth/sign-in");
  };

  const handleAccountClick = () => {
    if (user?.role === "admin") {
      router.push("/admin");
    } else if (user?.role === "creator") {
      router.push("/creator");
    }
    toggleDrawer(false);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} href="/">
          <ListItemText primary="Events" />
        </ListItem>
        {isAuth ? (
          <ListItem>
            <AuthProfileMenu />
          </ListItem>
        ) : (
          <ListItem component={Link} href="/auth/sign-in">
            <ListItemText primary="Sign In" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Link href="/" passHref>
              {/* Directly reference the logo image from the public folder */}
              <Image
                src="/images/white_nsc_logo.png"
                alt="logo"
                width={40}
                height={40}
              />
            </Link>
          </Box>

          <Box>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: "block", sm: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Grid
              container
              spacing={2}
              justifyContent="flex-end"
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {/* Events Link remains outside AuthProfileMenu for general access */}
              <Box>
                <Link href="/" passHref>
                  <Button color="inherit" sx={{ textTransform: "none" }}>
                    Events
                  </Button>
                </Link>
              </Box>

              {/* AuthProfileMenu contains Create Event and Sign Out actions */}
              {isAuth && user && (
                <Box
                  sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}
                >
                  <Tooltip title="Open user menu">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, ml: 3, mr: 1, color: "white" }}
                    >
                      <AccountCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    disableScrollLock
                  >
                    {isAuth && user && (
                      <MenuItem
                        onClick={() => {
                          handleProfileClick();
                          handleCloseUserMenu();
                        }}
                      >
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                    )}
                    {isAuth &&
                      user &&
                      (user.role === "admin" || user.role === "creator") && (
                        <MenuItem
                          onClick={() => {
                            handleAccountClick();
                            handleCloseUserMenu();
                          }}
                        >
                          <Typography textAlign="center">My Account</Typography>
                        </MenuItem>
                      )}
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        handleSignOut();
                      }}
                    >
                      <Typography textAlign="center">Sign Out</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )}

              {!isAuth && (
                <Box>
                  <Link href="/auth/sign-in" passHref>
                    <Button color="inherit" sx={{ textTransform: "none" }}>
                      Sign In
                    </Button>
                  </Link>
                </Box>
              )}

              <Box sx={{ ml: 1, mr: 1 }}>
                <ThemeToggle />
              </Box>
            </Grid>
          </Box>
        </Box>
      </Toolbar>
      <DrawerComp
        isOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        isAuth={isAuth}
      />
    </AppBar>
  );
}
