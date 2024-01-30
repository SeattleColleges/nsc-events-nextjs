import React, { ChangeEventHandler } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  required?: boolean;
  togglePasswordVisibility?: () => void;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  required,
  icon,
  togglePasswordVisibility,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      error={!!error}
      helperText={error}
      fullWidth
      variant="outlined"
      margin="normal"
      InputProps={{
        endAdornment: togglePasswordVisibility && icon ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
            >
              {icon}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};


export default InputField;
