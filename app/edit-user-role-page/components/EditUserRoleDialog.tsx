import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const options = ["admin", "creator", "user"];

interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string, success?: boolean, userId?: string) => void;
}

export function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const [roleUpdated, setRoleUpdated] = useState(false);
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
      setRoleUpdated(false);
    }
  }, [valueProp, open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);
    if (newValue !== valueProp) {
      setRoleUpdated(true);
    } else {
      setRoleUpdated(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if (value !== valueProp) {
      console.log("New role: ", value);

      onClose(value, true); // Indicate success
    } else {
      onClose(); // Indicate no change
    }
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "50%", maxHeight: 435 } }}
      maxWidth="xs"
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
            <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk} disabled={!roleUpdated}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function EditUserRoleDialog({
  user,
  onClose,
}: {
  user: { id: string; role: string };
  onClose: (newRole?: string, success?: boolean, userId?: string) => void;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.role);

  const handleClickIcon = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string, success?: boolean) => {
    setOpen(false);
    onClose(newValue, success, user.id);
    if (success && newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      <IconButton onClick={handleClickIcon}>
        <EditIcon />
      </IconButton>
      <ConfirmationDialogRaw
        id="role-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
      />
    </>
  );
}
