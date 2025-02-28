"use client";
// EditUserRolePage.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormHelperText
} from "@mui/material"; 
import useAuth from "@/hooks/useAuth";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import UserTable from "@/app/edit-user-role-page/components/UserTable"; // Import the new UserTable component
import { UsersData } from "./models/interface";
import useDebounce from "@/hooks/useDebounce";
const EditUserRolePage = () => {
  const [userInfo, setUserInfo] = useState<UsersData>({ data: [], page: 1, total: 0, pages: 0 }); // All users
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [roleFilter, setRoleFilter] = useState<string>(""); // New state for role filtering
  const [newRole, setNewRole] = useState<string>(""); // User role we're editing
  // const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Selected user ID
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null); // Snackbar message for feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const { isAuth, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Debounce the query to avoid making too many requests
  const debouncedQueryData = useDebounce(searchParams, 500);
  // Fetch users on debounced query, page, or role changes
  useEffect(() => {
    const resetAndFetchUsers = async () => {
      // Reset to page 1 before fetching users for a new search query
      setUserInfo((prev) => ({ ...prev, page: 1 }));
      // Ensure fetchUsers is called after the page reset
      await fetchUsers(debouncedQueryData, 1, roleFilter);
    };
    resetAndFetchUsers();
  }, [debouncedQueryData, roleFilter]);
  // Handle page change for table pagination
  const handlePageChange = (newPage: number) => {
    // Update the page in the userInfo state
    setUserInfo((prev) => ({ ...prev, page: newPage }));
    // query Fetch users for the new page
    fetchUsers(debouncedQueryData, newPage, roleFilter);
  };
  // Handle input change for search parameters
  const handleInputChange =
    (field: keyof typeof searchParams) => (event: React.ChangeEvent<HTMLInputElement>) => {
      // Updates based on the search field being used (first name, last name, or email)
      const newParams = { ...searchParams, [field]: event.target.value };
      setSearchParams(newParams); // Updates state, triggering the debounce
    };
  // handle the role change for dropdown box filtering 
  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRoleFilter(event.target.value);
  };
  // Fetch users from the API based on the query, page, and role
  async function fetchUsers(
    inputs: { firstName: string; lastName: string; email: string },
    page: number = 1,
    role: string
  ) {
    console.log("Fetching users with:", { inputs, page }); // Debugging log 
    const token = localStorage.getItem("token");
    const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
    // Check if the API URL is defined
    if (!apiUrl) {
      console.error("API URL is not defined");
      return;
    }
    // Filter out empty fields and create the search query part
    const searchParams = new URLSearchParams();
    // Add only non-empty fields to the searchParams
    if (inputs.firstName.trim()) {
      searchParams.append("firstName", inputs.firstName);
    }
    if (inputs.lastName.trim()) {
      searchParams.append("lastName", inputs.lastName);
    }
    if (inputs.email.trim()) {
      searchParams.append("email", inputs.email);
    }
    if (role) { 
      searchParams.append("role", role); // Append role if selected
    }
    
    // Add page and sort parameters to the searchParams
    searchParams.append("page", page.toString());
    const url = `${apiUrl}/users/search?${searchParams.toString()}`;
    console.log("fetching users");
    console.log(url);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        const data: UsersData = await res.json();
        console.log("API Response (Users Data):", data); 
        setUserInfo(data);
      }
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  }
  // Function to accept the new role and update via API
  async function acceptNewRole(userId: string, role: string) {
    const token = localStorage.getItem("token");
    try {
      const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
      // Check if the API URL is defined
      if (!apiUrl) {
        console.error("API URL is not defined");
        return;
      }
      const response = await fetch(`${apiUrl}/users/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });
      if (response.ok) {
        setSnackbarMessage("User role updated successfully!");
      } else {
        setSnackbarMessage("Error updating user role!");
      }
    } catch (error) {
      setSnackbarMessage("Error updating user role!");
    }
    setSnackbarOpen(true);
  }
  // closing the dialog and updating role for the user if a change is made
  const handleEditRoleDialog = (role?: string, success?: boolean, userId?: string) => {
    if (success && role && userId) {
      setNewRole(role);
      acceptNewRole(userId, role);
      // update the role on the frontend
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        data: prevUserInfo.data.map((user) => (user.id === userId ? { ...user, role } : user)),
      }));
    }
  };
  // make sure user is an admin
  if (isAuth && user?.role === "admin") {
    return (
      <div>
        <Typography
          fontSize={isMobile ? "1.75rem" : "2.25rem"}
          textAlign={"center"}
          margin={"1.5rem"}
        >
          User Management
        </Typography>
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            alignItems: "center",
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              padding: "1rem",
              display: "flex",
              flexDirection: "row", // Arrange search bars horizontally
              justifyContent: "space-between", // Space out search bars
              gap: "1rem", // Space between search bars
              width: "100%",
              maxWidth: "80%",
              margin: "0 auto",
            }}
          >
            {/* First Name Search Bar */}
            <Box sx={{ width: "22%" }}>
              <TextField
                id="outlined"
                label="First Name"
                helperText="Search by first name"
                value={searchParams.firstName}
                onChange={handleInputChange("firstName")}
                fullWidth
              />
            </Box>
            {/* Last Name Search Bar */}
            <Box sx={{ width: "22%" }}>
              <TextField
                id="outlined"
                label="Last Name"
                helperText="Search by last name"
                value={searchParams.lastName}
                onChange={handleInputChange("lastName")}
                fullWidth
              />
            </Box>
            {/* Email Search Bar */}
            <Box sx={{ width: "22%" }}>
              <TextField
                id="outlined"
                label="Email"
                helperText="Search by email"
                value={searchParams.email}
                onChange={handleInputChange("email")}
                fullWidth
              />
            </Box>
            {/* Role Filter Dropdown */}
            <Box sx={{ width: "22%" }}>
              <FormControl fullWidth>
                <InputLabel id="role-filter-label" shrink>Role</InputLabel>
                <Select
                  labelId="role-filter-label"
                  id="role-filter"
                  value={roleFilter}
                  onChange={handleRoleChange}
                  displayEmpty
                  label="Role"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="creator">Creator</MenuItem>
                </Select>
                <FormHelperText>Filter by role</FormHelperText> 
              </FormControl>
            </Box>
          </Box>
          {/* Adds some space between TextField and UserTable */}
          <UserTable
            userInfo={userInfo}
            handleEditRoleDialog={handleEditRoleDialog}
            onPageChange={handlePageChange}
          />
        </Box>
        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </div>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
};
export default EditUserRolePage;
