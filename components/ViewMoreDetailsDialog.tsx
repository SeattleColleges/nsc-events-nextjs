import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  Button,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { ActivityDatabase } from "@/models/activityDatabase";

interface ViewMoreDetailsDialogProps {
  isOpen: boolean;
  // current event being looked at
  event: ActivityDatabase;
  // current user's role so we can display details based on role
  userRole: string;
  userId: string;
  dialogToggle: () => void;
  attendeeCount?: number; // added to update number of attendees inside more details
}

function ViewMoreDetailsDialog({
  isOpen,
  event,
  userRole,
  userId,
  dialogToggle,
}: ViewMoreDetailsDialogProps) {
  // Simple "array to string" function for handling activity details that are arrays
  const arrayToString = (arr: any[]) => arr.join(", ");
  const isCreatorOfEvent = userId === event.createdByUser
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const moreDetails = [
    { title: "Host", detail: event.eventHost },
    { title: "Meeting URL", detail: event.eventMeetingURL },
    { title: "Registration", detail: event.eventRegistration },
    { title: "Tags", detail: arrayToString(event.eventTags) },
    { title: "Speakers", detail: arrayToString(event.eventSpeakers) },
    { title: "Contact", detail: event.eventContact },
    { title: "Accessibility", detail: event.eventAccessibility },
    { title: "Document", detail: event.eventDocument },
  ];

  const userDetails = [
    { title: "Schedule", detail: event.eventSchedule },
    { title: "Prerequisites", detail: event.eventPrerequisites },
    { title: "Cancellation Policy", detail: event.eventCancellationPolicy },
    { title: "Privacy", detail: event.eventPrivacy },
    { title: "Social media", detail: event.eventSocialMedia },
  ];

  const creatorDetails = [
    { title: "Category", detail: event.eventCategory },
    { title: "Capacity", detail: event.eventCapacity },
  ];

  const eventNoteDetail = [{ title: "Event Note", detail: event.eventNote }];
  const attendanceCount = [{ title: "Attendance Count", detail: event.attendanceCount ?? "Not Available" }];
  const archived = [{ title: "Archived", detail: event.isArchived ? "Yes" : "No" }];

  // Simple function to check if the event details being mapped is an object
  const isObject = (value: any) => value && typeof value === "object" && !Array.isArray(value);

  // Map details function, parses detail objects (such as event.socialMedia) differently
  const mapDetails = (detailsArray: { title: string; detail: any }[]) => {
    return detailsArray.map((detail, id) => {
      // handle/map activity detail objects
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
        // Otherwise, map the detail normally
      } else if (detail.detail !== undefined || detail.detail !== "") {
        return (
          <ListItem key={id}>
            <ListItemText primary={`${detail.title}: ${detail.detail}`} />
          </ListItem>
        );
      } else {
        // Handle the case where detail.detail is undefined
        return (
          <ListItem key={id}>
            <ListItemText primary={`${detail.title}: Not Available`} />
          </ListItem>
        );
      }
    });
  };

  return (
    <>
      <Dialog open={isOpen} maxWidth={"md"} fullWidth
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          '& .MuiDialog-paper': {
            width: isMobile ? "90%" : "500px",
            margin: 0,
          },
        }}>
        <DialogTitle>{"More Details:"}</DialogTitle>
        <DialogContent dividers sx={{ height: "fit-content" }}>
          {/* map out the moreDetails object as a ListItem for each, handle each user role differently*/}
          {mapDetails(moreDetails)}
          {(userRole == "creator" || userRole == "admin") && <>{mapDetails(creatorDetails)}</>}
          {(userRole == "user" || userRole == "creator" || userRole == "admin") && <>{mapDetails(userDetails)}</>}
          {(userRole == "admin" || isCreatorOfEvent) && <>{mapDetails(eventNoteDetail)}{mapDetails(attendanceCount)}{mapDetails(archived)}</>}
        </DialogContent>

        {/* cancel button to exit the dialog box */}
        <DialogActions>
          <Button onClick={() => dialogToggle()}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ViewMoreDetailsDialog;
