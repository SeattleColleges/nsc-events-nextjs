import React, { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from '@mui/icons-material/Check';
import EditUserRoleDialog from "./EditUserRoleDialog";
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

export interface UserCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

function UserCard({ user }: { user: UserCardProps }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editCompleted, setEditCompleted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [newRole, setNewRole] = useState(user.role);

  const handleEditClick = async () => {
    if (editCompleted) {
      window.location.reload();
    } else if (openDialog) {
      setOpenDialog(false);
    } else {
      setOpenDialog(true);
    }

    if (editCompleted) {
      const token = localStorage.getItem('token');
      try {
        const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
        const response = await fetch(`${apiUrl}/users/update/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ role: newRole })
        });
        if (response.ok) {
          setSnackbarSeverity('success');
          setSnackbarMessage('User role updated successfully!');
          setSnackbarOpen(true);
        } else {
          console.error('Failed to update user role:', response.statusText);
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to update user role');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('Error updating user role:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error updating user role');
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseDialog = (newRole?: string, success?: boolean) => {
    setOpenDialog(false);
    if (success && newRole) {
      setNewRole(newRole);
      setEditCompleted(true);
    }
  };

  const handleCancel = () => {
    if (editCompleted) {
      setOpenDialog(false);
      setEditCompleted(false);

    } else {
      setOpenDialog(false);
    }
  };

  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px",
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body1" gutterBottom>
          User ID: {user.id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Full Name: {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Current Role: {user.role}
        </Typography>
        {editCompleted && (
        <Typography variant="body1" gutterBottom>
          Selected Role: {newRole}
        </Typography>
        )}
        {openDialog && (
          <Box display="flex" justifyContent="center">
            <EditUserRoleDialog user={user} onClose={handleCloseDialog} />
          </Box>
        )}
        <Box p={2} display="flex" justifyContent="center">
        {!openDialog && (
          <Button
            variant="contained"
            color="primary"
            endIcon={editCompleted ? "" : <EditIcon />}
            onClick={editCompleted ? handleCancel : handleEditClick}
          >
          {editCompleted ? "Cancel" : "Edit"}
          </Button>
        )}
        {openDialog && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCancel}
          >
          Cancel
          </Button>
        )}
        {editCompleted && (
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            endIcon={<CheckIcon />}
            onClick={handleEditClick}
          >
            Done
          </Button>
        )}
        </Box>
      </Stack>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UserCard;
