import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar: React.FC<{ onSearch: (searchTerm: string) => void }> = ({
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <TextField
      value={searchTerm}
      label="Search Events, Categories, Location..."
      variant="outlined"
      fullWidth
      margin="normal"
      sx={{
        backgroundColor: "#fff",
        borderRadius: "4px",
      }}
    />
  );
};

export default SearchBar;
