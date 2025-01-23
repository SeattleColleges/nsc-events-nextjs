"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Stack,
} from "@mui/material";
import EditUserRoleDialog from "@/app/edit-user-role-page/components/EditUserRoleDialog"; // Import the dialog component for editing user roles

/**
 * Represents a single user.
 */
interface User {
  id: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  email: string;
  role: string;
}

/**
 * Props for the UserTable component.
 */
interface UserTableProps {
  userInfo: {
    data: User[]; // The list of users
    page: number; // Current page
    total: number; // Total number of users
    pages: number; // Total number of pages
  };
  handleCloseDialog: (role?: string, success?: boolean, userId?: string) => void; // Function passed from the parent to handle dialog close
  onSearch: (query: string) => void; // Function to handle search input
  onPageChange: (page: number) => void; // Function to handle page changes
  onSortChange: (sort: string) => void; // Function to handle sorting changes
}

/**
 * Table component to display a list of users.
 */
const UserTable: React.FC<UserTableProps> = ({
  userInfo,
  handleCloseDialog,
  onSearch,
  onPageChange,
  onSortChange,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchValue(query);
    onSearch(query); // Trigger search function passed from the parent
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page); // Trigger page change function passed from the parent
  };

  // Filtering the user list based on the search text
  return (
    <>
      {/* Search Bar */}
      <TextField
        sx={{ marginBottom: "1rem" }}
        id="outlined"
        label="Search Users"
        value={searchValue}
        onChange={handleSearchTextChange}
      />

      {/* User Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                E-Mail
              </TableCell>
              <TableCell
                sx={{ fontWeight: 700, cursor: "pointer" }}
                align="left"
                onClick={() => onSortChange("role")}
              >
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userInfo.data.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    opacity: 0.9,
                  },
                  transition: "background-color 0.3s ease, opacity 0.3s ease",
                }}
              >
                <TableCell component="th" scope="row">
                  {user.firstName + " " + user.lastName}
                </TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{user.role.toUpperCase()}</TableCell>
                <TableCell>
                  <EditUserRoleDialog user={user} onClose={handleCloseDialog} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} justifyContent="center" alignItems="center" marginTop="1rem">
        <Pagination
          count={userInfo.pages}
          page={userInfo.page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </Stack>
    </>
  );
};

export default UserTable;
