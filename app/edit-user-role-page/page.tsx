"use client";
// EditUserRolePage.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme, Snackbar, TextField } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import UserTable from "@/app/edit-user-role-page/components/UserTable"; // Import the new UserTable component
import { UsersData } from "./models/interface";

/**
 * Fetch user info from the server
 * @param setUserInfo
 */
async function fetchUsers(
  setUserInfo: (userInfo: UsersData) => void,
  query: string = "",
  page: number = 1,
  sort: string = ""
) {
  const token = localStorage.getItem("token");
  const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiUrl}/users/search?s=${query}&page=${page}&sort=${sort}`, {
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
      setUserInfo(data);
      console.log(data);
    }
  } catch (error) {
    console.error("Error getting user info:", error);
  }
}

/**
 * Edit user role page
 * @returns
 */
const EditUserRolePage = () => {
  const [userInfo, setUserInfo] = useState<UsersData>({ data: [], page: 1, total: 0, pages: 0 }); // All users
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<string>("asc");
  const [newRole, setNewRole] = useState<string>(""); // User role we're editing
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Selected user ID
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null); // Snackbar message for feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state

  const { isAuth, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchUsers(setUserInfo, query, userInfo.page, sort);
  }, [query, userInfo.page, sort]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setUserInfo((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
  };

  const handlePageChange = (newPage: number) => {
    setUserInfo((prev) => ({ ...prev, page: newPage }));
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  // Function to accept the new role and update via API
  const acceptNewRole = async (userId: string, role: string) => {
    const token = localStorage.getItem("token");
    try {
      const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
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
  };

  // Close dialog and update role in parent component
  const handleCloseDialog = (role?: string, success?: boolean, userId?: string) => {
    // if (success && role && userId) {
    //   setNewRole(role);
    //   acceptNewRole(userId, role);
    //   setUserInfo((prevUserInfo) =>
    //     prevUserInfo.map(
    //       (user) => (user.id === userId ? { ...user, role } : user) // Update the role of the modified user
    //     )
    //   );
    // }
  };

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
            alignItems: "flex-start",
            width: "100%",
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          {/* <SearchBar /> */}
          {/* Adds some space between TextField and UserTable */}
          <UserTable
            userInfo={userInfo}
            handleCloseDialog={handleCloseDialog}
            onSearch={handleSearch}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
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
