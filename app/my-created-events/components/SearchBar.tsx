import React, { useState } from "react";
import { TextField, useTheme } from "@mui/material";

const SearchBar: React.FC<{ onSearch: (searchTerm: string) => void }> = ({
  onSearch,
}) => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <TextField
      value={searchTerm}
      onChange={handleChange}
      label="Search Events, Categories, Location…"
      variant="outlined"
      fullWidth
      margin="normal"
      sx={{
        // switch the background based on theme mode:
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : "#fff",
        borderRadius: 1,

        // keep the input text and label visible:
        "& .MuiInputBase-input": {
          color: theme.palette.text.primary,
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.text.secondary,
        },
        "& .Mui-focused .MuiInputLabel-root": {
          color: theme.palette.text.primary,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.text.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
        },
      }}
    />
  );
};

export default SearchBar;
