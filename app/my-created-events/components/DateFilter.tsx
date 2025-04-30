import React, { useState } from "react";
import styles from "./DateFilter.module.css";
import { TextField, useTheme } from "@mui/material";

const DateFilter: React.FC<{ onDateChange: (date: string) => void }> = ({
  onDateChange,
}) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    onDateChange(event.target.value);
  };

  return (
    <TextField
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
      variant="outlined"
      fullWidth={false}
      sx={{
        width: 200,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : "#fff",
        borderRadius: 1,
        "& .MuiInputBase-input": {
          color: theme.palette.text.primary,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[700]
              : "#ccc",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.text.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
        },
        "& input[type='date']::-webkit-calendar-picker-indicator": {
      cursor: "pointer",
      // invert the dark icon to light; in light mode you can leave it normal
      filter: theme.palette.mode === "dark"
        ? "invert(1) brightness(2)"
        : "none",
    },
      }}
    />
  );
};

export default DateFilter;
