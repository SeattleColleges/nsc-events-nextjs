"use client";

import React from "react";
import { useThemeContext } from "../app/theme/providers";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  // Get the current theme mode and the function to toggle it
  const { mode, toggleTheme } = useThemeContext() as {
    mode: string;
    toggleTheme: () => void;
  };

  // Render the appropriate icon based on the current theme mode
  if (mode === "light") {
    return (
      <FiMoon
        onClick={toggleTheme}
        aria-label="Toggle Dark Theme"
        style={{ cursor: "pointer" }}
        onMouseOver={(e) => (e.currentTarget.style.color = "gray")}
        onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
      />
    );
  }

  // Render the appropriate icon based on the current theme mode
  if (mode === "dark") {
    return (
      <FiSun
        onClick={toggleTheme}
        aria-label="Toggle Light Theme"
        style={{ cursor: "pointer" }}
        onMouseOver={(e) => (e.currentTarget.style.color = "gray")}
        onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
      />
    );
  }
};

export default ThemeToggle;
