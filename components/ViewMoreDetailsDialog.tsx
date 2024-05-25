import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  DialogContentText,
  Divider,
  FormControlLabel,
  ListItem,
  ListItemText,
  SnackbarContent,
  Tooltip,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ActivityDatabase } from "@/models/activityDatabase";

interface ViewMoreDetailsDialogProps {
  isOpen: boolean;
  // prop to gain access to the current event being looked at
  event: ActivityDatabase;
  // prop to gain access to the current user's role so we can display details based on role
  userRole: string;
  dialogToggle: () => void;
}

function ViewMoreDetailsDialog({
  isOpen,
  event,
  userRole,
  dialogToggle,
}: ViewMoreDetailsDialogProps) {
  const moreDetails = [
    { title: "Event Host", detail: event.eventHost },
    { title: "URL", detail: event.eventMeetingUrl },
    { title: "Registration", detail: event.eventRegistration },
    { title: "Tags", detail: event.eventTags },
    { title: "Event Speakers", detail: event.eventSpeakers },
    { title: "Event Contact", detail: event.eventContact },
    { title: "Accessibility", detail: event.eventAccessibility },
  ];

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>{"More Details:"}</DialogTitle>
        <DialogContent dividers sx={{ height: "fit-content" }}>
          {/* map out the moreDetails object as a ListItem for each */}
          {moreDetails.map((detail, id) => (
            <ListItem key={id}>
              <ListItemText primary={`${detail.title}: ${detail.detail}`} />
            </ListItem>
          ))}
        </DialogContent>
        {/* cancel button to leave the dialog box */}
        <DialogActions>
          <Button onClick={() => dialogToggle()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ViewMoreDetailsDialog;
