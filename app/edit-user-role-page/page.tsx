"use client";
import React, { useState, useEffect } from "react";
import UserCard from "../../components/UserCard";
import { Box, Stack, Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";

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
  const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
  try {
    const res = await fetch(`${apiUrl}/users`, {
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

  const { isAuth, user } = useAuth();

  if (isAuth && (user?.role === 'admin')) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack alignItems="center">
          <Typography
              fontSize={"2.25rem"}
              textAlign={"center"}
              marginTop={"2rem"}
          >User Management
          </Typography>
          {userInfo.map((user, index) => (
            <UserCard user={user} key={index} />
          ))}
        </Stack>
      </Box>
    );
 } else {
  return <UnauthorizedPageMessage/>
  }
};

export default EditUserRolePage;