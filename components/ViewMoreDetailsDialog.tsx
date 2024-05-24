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
  event: ActivityDatabase;
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
          {moreDetails.map((detail, id) => (
            <ListItem key={id}>
              <ListItemText primary={detail.title + ": " + detail.detail} />
            </ListItem>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => dialogToggle()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ViewMoreDetailsDialog;
