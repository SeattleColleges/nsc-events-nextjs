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
  // current event being looked at
  event: ActivityDatabase;
  // current user's role so we can display details based on role
  userRole: string;
  dialogToggle: () => void;
}

function ViewMoreDetailsDialog({
  isOpen,
  event,
  userRole,
  dialogToggle,
}: ViewMoreDetailsDialogProps) {

  // Simple array to string function for handling activity details that are arrays
  const arrayToString = (arr: any[]) => arr.join(", ");
  
  const moreDetails = [
    { title: "Event Host", detail: event.eventHost },
    { title: "URL", detail: event.eventMeetingUrl },
    { title: "Registration", detail: event.eventRegistration },
    { title: "Tags", detail: arrayToString(event.eventTags) },
    { title: "Event Speakers", detail: arrayToString(event.eventSpeakers) },
    { title: "Event Contact", detail: event.eventContact },
    { title: "Accessibility", detail: event.eventAccessibility },
  ];

  const creatorDetails = [
    { title: "Category", detail: event.eventCategory },
    { title: "Capacity", detail: event.eventCapacity },
    { title: "Schedule", detail: event.eventSchedule },
    { title: "Prerequisites", detail: event.eventPrerequisites },
    { title: "Cancelation Policy", detail: event.eventCancellationPolicy },
    { title: "Social media", detail: event.eventSocialMedia },
    // trouble accessing attendanceCount
    // { title: "Attendance Count", detail: event.attendanceCount },
    { title: "Privacy", detail: event.eventPrivacy },
    { title: "Archived", detail: event.isHidden ? "Yes" : "No" },
  ];

  const adminDetails = [{ title: "Event Note", detail: event.eventNote }];
  
  // Simple function to check if the event details being mapped is an object 
  const isObject = (value: any) => value && typeof value === "object" && !Array.isArray(value);
  // 
  const mapDetails = (detailsArray: { title: string; detail: any }[]) => {
    return detailsArray.map((detail, id) => {
      if (isObject(detail.detail)) {
        return (
          <ListItem key={id}>
            <ListItemText
              primary={`${detail.title}:`}
              secondary={Object.keys(detail.detail).map((key, idx) => (
                <React.Fragment key={idx}>
                  {`${key}: ${detail.detail[key]}`}
                  <br />
                </React.Fragment>
              ))}
            />
          </ListItem>
        );
      } else {
        return (
          <ListItem key={id}>
            <ListItemText primary={`${detail.title}: ${detail.detail}`} />
          </ListItem>
        );
      }
    });
  };


  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>{"More Details:"}</DialogTitle>
        <DialogContent dividers sx={{ height: "fit-content" }}>
          {/* map out the moreDetails object as a ListItem for each */}
          {mapDetails(moreDetails)}
          {userRole == "creator" && <>{mapDetails(creatorDetails)}</>}
          {userRole == "admin" && <>{mapDetails(adminDetails)}</>}
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