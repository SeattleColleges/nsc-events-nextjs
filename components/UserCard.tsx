import React, { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditUserRoleDialog from "./EditUserRoleDialog";

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

  const handleEditClick = () => {
    if (editCompleted) {
      window.location.reload();
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = (success: boolean) => {
    setOpenDialog(false);
    if (success) {
      setEditCompleted(true);
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
        {openDialog && (
          <Box display="flex" justifyContent="center">
            <EditUserRoleDialog user={user} onClose={handleCloseDialog} />
          </Box>
        )}
        <Box p={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
          >
            {editCompleted ? "Done" : "Edit"}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default UserCard;
