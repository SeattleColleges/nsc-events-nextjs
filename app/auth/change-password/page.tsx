"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Image from "next/image";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  useMediaQuery,
} from "@mui/material";
import { textFieldStyle } from "@/components/InputFields";
import { validateChangePassword } from "./validatePassword";
import { changePassword } from "./changePasswordApi";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import blue_vertical_nsc_logo from '../../../public/images/blue_vertical_nsc_logo.png'
import white_vertical_nsc_logo from '../../../public/images/white_vertical_nsc_logo.png'
import { useTheme } from "@mui/material";

interface State extends SnackbarOrigin {
  open: boolean;
}

const ChangePassword = () => {
  const router = useRouter();
  const { palette } = useTheme();
  
  const darkImagePath = white_vertical_nsc_logo;
  const lightImagePath = blue_vertical_nsc_logo;
  const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Set initial state for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setNewPasswordConfirm] = useState(false);

  // Toggle password visibility
  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };
  const togglePasswordConfirmVisibility = () => {
    setNewPasswordConfirm(!showNewPasswordConfirm);
  };

  const [pageInfo, setPageInfo] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  // Set initial state for errors
  const [errors, setErrors] = useState<Partial<typeof pageInfo>>({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  // Set initial state for snackbar message
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const { currentPassword, newPassword, newPasswordConfirm } = pageInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setErrors({ ...errors, [name]: "" });
    setPageInfo({ ...pageInfo, [name]: value }); // set page info from the form
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Validate user input
    let errors = validateChangePassword(pageInfo);
    setErrors(errors);
    const hasErrors = Object.values(errors).some((error) => error !== "");
    // If there are errors, do not submit the form
    if (hasErrors) {
      return;
    }

    // Generate form for password change
    const passwordChangeForm = {
      currentPassword,
      newPassword,
      newPasswordConfirm,
    };

    const userToken = localStorage.getItem("token");
    if (userToken) {
      changePassword(passwordChangeForm, userToken)
        .then((response) => {
          console.log(response.message);
          setSnackBarMessage(response.message);
          // Handle success
          if (response.status === "success") {
            localStorage.removeItem('token');
            window.dispatchEvent(new CustomEvent('auth-change'));
            setTimeout(() => {
              router.push("/auth/sign-in");
            }, 2000); // Navigate back to the sign-in page after 2 seconds
          }
        })
        .catch((error) => {
          // Handle error
          console.error(error);
          setSnackBarMessage("An error occurred."); // Update with a generic or specific error message
        });
    } else {
      console.error("No user token available");
      // Handle the case when there's no user token (e.g., show an error message)
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
        mt: isMobile ? -6 : isTablet ? -4 : -8
      }}
    >
      <Paper
        elevation={6}
        sx={{ padding: 4, width: "100%", borderRadius: 2, mb: 2 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <Image
              src={imagePath.src}
              alt="North Seattle College Logo"
              width={150}
              height={50}
              style={{ borderRadius: "10px" }}
            />
          </Box>
          <Typography component="h2" variant="h6">
            Change Password
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label="Current Password"
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            autoComplete="current-password"
            value={pageInfo.currentPassword}
            onChange={handleChange}
            error={Boolean(errors.currentPassword)}
            helperText={errors.currentPassword}
            InputLabelProps={{ style: textFieldStyle.label }}
            InputProps={{
              style: textFieldStyle.input,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password"
                    onClick={toggleCurrentPasswordVisibility}
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            autoComplete="new-password"
            value={pageInfo.newPassword}
            onChange={handleChange}
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword}
            InputLabelProps={{ style: textFieldStyle.label }}
            InputProps={{
              style: textFieldStyle.input,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPasswordConfirm"
            label="Confirm New Password"
            type={showNewPasswordConfirm ? "text" : "password"}
            id="newPasswordConfirm"
            autoComplete="new-password"
            value={pageInfo.newPasswordConfirm}
            onChange={handleChange}
            error={Boolean(errors.newPasswordConfirm)}
            helperText={errors.newPasswordConfirm}
            InputLabelProps={{ style: textFieldStyle.label }}
            InputProps={{
              style: textFieldStyle.input,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password"
                    onClick={togglePasswordConfirmVisibility}
                  >
                    {showNewPasswordConfirm ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            style={{ textTransform: "none" }}
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
          <Box textAlign="center">
            <MuiLink href="/auth/forgot-password" variant="body2">
              Forgot password?
            </MuiLink>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={Boolean(snackBarMessage)}
        autoHideDuration={6000}
        onClose={() => setSnackBarMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={snackBarMessage}
      />
    </Container>
  );
};

export default ChangePassword;
