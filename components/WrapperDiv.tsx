import React from "react";
import { Box, BoxProps } from "@mui/material";

const styles = {
  padding: "1rem",
  borderRadius: "0.5rem",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  textAlign: "center",
};

const CustomCardContent: React.FC<BoxProps> = ({ children }) => {
  return <Box sx={styles}>{children}</Box>;
};

export default CustomCardContent;
