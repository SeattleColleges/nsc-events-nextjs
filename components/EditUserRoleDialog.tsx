import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useRef, useState } from "react";

const options = ["admin", "creator", "user"];

interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string, success?: boolean) => void;
}

export function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  }; 

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if (value !== valueProp) {
      onClose(value, true); // Indicate success
    } else {
      onClose();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "50%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>User Role</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="role"
          name="role"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function EditUserRoleDialog({
  user,
  onClose,
}: {
  user: { id: string; role: string };
  onClose: (newRole?: string, success?: boolean) => void;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.role);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string, success?: boolean) => {
    setOpen(false);
    onClose(newValue, success);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        bgcolor: "#fff",
        color: "#000",
        boxShadow: 1,
        borderRadius: "8px"
      }}
    >
      <List component="div" role="group">
        <ListItemButton
          divider
          aria-haspopup="true"
          aria-controls="role-menu"
          aria-label="User role"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Select User Role" secondary={value} secondaryTypographyProps={{ sx: { color: "#333" } }}/>
        </ListItemButton>
        <ConfirmationDialogRaw 
          id="role-menu" 
          keepMounted 
          open={open} 
          onClose={handleClose} 
          value={value} 
        />
      </List>
    </Box>
  );
}
