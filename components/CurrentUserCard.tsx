import React, { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditUserRoleDialog from "../app/edit-user-role-page/components/EditUserRoleDialog";

export interface CurrentUserCardProps {
  firstName: string;
  lastName: string;
  email: string;
  pronouns: string;
}

function CurrentUserCard({ user }: { user: CurrentUserCardProps }) {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 1,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Stack direction="column" spacing={1}>
        <Typography variant="body1" gutterBottom>
          First Name: {user.firstName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Last Name: {user.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Pronouns: {user.pronouns}
        </Typography>
      </Stack>
    </Box>
  );
}
export default CurrentUserCard;
