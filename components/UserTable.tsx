"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditUserRoleDialog from "@/components/EditUserRoleDialog"; // Import the dialog component for editing user roles

/**
 * Represents a single user.
 */
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

/**
 * Props for the UserTable component.
 */
interface UserTableProps {
  userInfo: User[]; // The list of users to display in the table
  handleCloseDialog: (role?: string, success?: boolean, userId?: string) => void; // Function passed from the parent to handle dialog close
}

/**
 * Table component to display a list of users.
 */
const UserTable: React.FC<UserTableProps> = ({ userInfo, handleCloseDialog }) => {
  return (
    // The TableContainer component wraps the table and applies Paper styling
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {/* Column headers for the table */}
            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="left">
              E-Mail
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="left">
              Role
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Edit</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {/* Mapping through the userInfo array to render each user's row */}
          {userInfo.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)", // Light gray background on hover
                  opacity: 0.9, // Slight opacity change on hover
                },
                transition: "background-color 0.3s ease, opacity 0.3s ease", // Smooth fade-in/out effect
              }}
            >
              {/* Name column */}
              <TableCell component="th" scope="row">
                {user.firstName + " " + user.lastName}
              </TableCell>

              {/* Email column */}
              <TableCell align="left">{user.email}</TableCell>

              {/* Role column */}
              <TableCell align="left">{user.role.toUpperCase()}</TableCell>

              {/* Edit column: Button to open the dialog for editing the user's role */}
              <TableCell>
                <EditUserRoleDialog user={user} onClose={handleCloseDialog} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
