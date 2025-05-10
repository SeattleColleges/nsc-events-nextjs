import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AttendedEvents } from "./AttendedEvents";
import useAuth from "@/hooks/useAuth";
import { getCurrentUserId } from "@/utility/userUtils";

interface UserContentProps {}

const UserContent: React.FC<UserContentProps> = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { user, isAuth } = useAuth();
  const { palette } = useTheme();
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";

  if (!isAuth || !user) {
    return <Typography>Please log in to see your events.</Typography>;
  }

  const userId = getCurrentUserId();
  const token = localStorage.getItem("token")!;

  const headerStyle = {
    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  };

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "85%",
        minHeight: "600px",
        marginLeft: isMobile ? "0px" : "10px",
        backgroundColor: containerColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: "7px",
        padding: { xs: "10px", sm: "15px", md: "20px" }, // Adjust padding for smaller screens
        marginBottom: { xs: "15px", sm: "0px" }, // Add spacing when stacked in small screens
        boxShadow: 3,
      }}
    >
      <Typography
        sx={{ fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}
      >
        User Content
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : { sm: "column", md: "row" },
          gap: "20px",
          justifyContent: "space-between",
          marginTop: "15px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "auto" : { sm: "100%", md: "35%" },
            boxShadow: 3,
            backgroundColor: containerColor,
            borderRadius: "7px",
          }}
        >
          <Typography sx={headerStyle}>Bio/Affiliations</Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "65%" },
            boxShadow: 3,
            backgroundColor: containerColor,
            borderRadius: "7px",
          }}
        >
          <Typography sx={headerStyle}>Events Attended</Typography>
          <AttendedEvents userId={userId} token={token} />
        </Box>
      </Box>
    </Box>
  );
};

export default UserContent;
