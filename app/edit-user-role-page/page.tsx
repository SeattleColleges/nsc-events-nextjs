"use client";
import React, { useState, useEffect } from "react";
import UserCard from "../../components/UserCard";
import { Box, Stack, Typography } from "@mui/material";

/**
 * Represents a user.
 */
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
/**
 * fetch user info from the server
 * @param setUserInfo
 */
async function fetchUser(setUserInfo: (userInfo: User[]) => void) {
  const token = localStorage.getItem("token");
  const apiUrl = "http://localhost:3000/api/users";
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
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
  const [userInfo, setUserInfo] = useState<User[]>([]);

  useEffect(() => {
    fetchUser(setUserInfo);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Stack>
        <Typography component="h1" variant="h4" sx={{ textAlign: "center", mt: 2 }}>
          User Management
        </Typography>
        {userInfo.map((user, index) => (
          <UserCard user={user} key={index} />
        ))}
      </Stack>
    </Box>
  );
};

export default EditUserRolePage;