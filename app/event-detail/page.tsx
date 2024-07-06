"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  SnackbarContent,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityDatabase, ActivityDatabase } from "@/models/activityDatabase";
import Snackbar from "@mui/material/Snackbar";
import styles from "@/app/home.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useRouter, useSearchParams } from "next/navigation";
import AttendDialog from "@/components/AttendDialog";
import ArchiveDialog from "@/components/ArchiveDialog";
import EditDialog from "@/components/EditDialog";
import { formatDate } from "@/utility/dateUtils";
import ViewMoreDetailsDialog from "@/components/ViewMoreDetailsDialog";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTheme } from "@mui/material";
import theme from "../theme";

interface SearchParams {
  searchParams: {
    id: string;
  };
}

const EventDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();
  const [event, setEvent] = useState<ActivityDatabase | null>(null);
  const [events, setEvents] = useState<ActivityDatabase[]>([]);
  const [isAuthed, setAuthed] = useState(false);
  const [token, setToken] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [attendDialogOpen, setAttendDialogOpen] = useState(false);
  const [moreDetailsDialogOpen, setMoreDetailsDialogOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const { palette } = useTheme();
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const DeleteDialog = () => {
    return (
      <>
        <Dialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
          }}
          autoFocus
        >
          <DialogTitle>{"Delete Event?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this event?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (event && event._id) {
                  deleteEventMutation(event._id);
                }
                setDialogOpen(false);
              }}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  const toggleEditDialog = () => {
    setEditDialogOpen(!editDialogOpen);
  };

  const deleteEvent = async (id: string) => {
    try {
      const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
      const response = await fetch(`${apiUrl}/events/remove/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Failed to delete event: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error("error: ", error);
      throw error;
    }
  };

  const { mutate: deleteEventMutation } = useMutation({
    mutationFn: deleteEvent,
     onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey:['events', 'myEvents', 'archivedEvents'] });
      setSnackbarMessage("Successfully deleted event.");
      setTimeout(() => {
        router.push("/");
      }, 1200);
    },
    onError: () => {
      setSnackbarMessage("Failed to delete event.");
    },
  });


  useEffect(() => {
    const getEvents = async () => {
      const events = queryClient.getQueryData<ActivityDatabase[]>(["events"]);
      if (events) {
        setEvents(events);
        const selectedEvent = events.find(event => event._id === id) as ActivityDatabase;
        setEvent(selectedEvent);
      } else {
        const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
        const response = await fetch(`${apiUrl}/events`);
        if (response.ok) {
          const allEvts = await response.json();
          setEvents(allEvts);
          const selectedEvent = allEvts.find((event: { _id: string; }) => event._id === id);
          setEvent(selectedEvent); // assuming there's only one event in response
        }
      }

      // if (events !== undefined) {
      //   setEvents(events);
      //   const selectedEvent = events.find(event => event._id === searchParams.id) as ActivityDatabase;
      //   setEvent(selectedEvent);
      // } else if (searchParams.id) {
      //   const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
      //   const response = await fetch(`${apiUrl}/events/find/${searchParams.id}`);
      //   if (response.ok) {
      //     const evt = await response.json();
      //     setEvent(evt);
      //     setEvents([evt]); 
      //   }
      // }
    };

    if (id) {
      setEvent(null);  // Reset event before fetching new data
      console.log("Fetching event with ID: ", id);
      getEvents();
    }
    
    const token = localStorage.getItem("token");
    // Sets token state that is used by delete mutation outside of effect
    setToken(token ?? "");
    if (token) {
      const role = JSON.parse(atob(token.split(".")[1])).role;
      const id = JSON.parse(atob(token.split(".")[1])).id;
      setUserRole(role);
      setUserId(id);
    }
  }, [queryClient, id]);


  const toggleAttendDialog = () => {
    if (token === "") {
      console.log(token);
      router.push("auth/sign-in");
    } else {
      setAttendDialogOpen(!attendDialogOpen);
    }
  };

  const toggleViewMoreDetailsDialog = () => {
    setMoreDetailsDialogOpen(!moreDetailsDialogOpen);
  };

  const toggleArchiveDialog = () => {
    setArchiveDialogOpen(!archiveDialogOpen);
  };

  const getNextEvent = () => {
    const currentIndex = events.findIndex(e => e._id === event?._id);
    if (currentIndex >= 0 && currentIndex < events.length - 1) {
      const nextEvent = events[currentIndex + 1];
      console.log("Navigating to:", nextEvent._id);
      router.push(`/event-detail?id=${nextEvent._id}`);
    }
  };

  const getPrevEvent = () => {
    const currentIndex = events.findIndex(e => e._id === event?._id);
    if (currentIndex > 0) {
      const prevEvent = events[currentIndex - 1];
      console.log("Navigating to:", prevEvent._id);
      router.push(`/event-detail?id=${prevEvent._id}`);
    }
  };

  // Debugging console logs
  useEffect(() => {
    console.log("Events: ", events);
    console.log("Current Event: ", event);
  }, [events, event]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box className={styles.container}
        sx={{
          position: "relative",
          zIndex: 0,
          overflow: "hidden",
          "&:before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: isMobile ? "" : `url(${event.eventCoverPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            opacity: 0.3
          }
        }}
      >
        <Box className={styles.container}
          sx={{ 
            backgroundColor: "rgba(0, 0, 0, 0)",
            zIndex: 1,
          }}
        >
        <Box
          className={styles.formContainer}
          sx={{ minHeight: "69vh", maxHeight: "100vh", width: "100vh", marginTop: 2, backgroundColor: isMobile ? "" : containerColor  }}
        >
          <Card sx={{ width: isMobile ? "41vh" : "50vh", minHeight: "59vh", maxHeight: "100vh", mt: isMobile ? 6 : "", marginBottom: 3 }}>
            <CardMedia
              component="img"
              image={event.eventCoverPhoto}
              alt={event.eventTitle}
              sx={{ height: "37vh" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {event.eventTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.eventDescription}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {formatDate(event.eventDate)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start Time: {event.eventStartTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                End Time: {event.eventEndTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {event.eventLocation}
              </Typography>
            </CardContent>
          </Card>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
                mt: 2,
              }}
            >
              <Grid container spacing={2} justifyContent="center" alignItems="center">
              {(userRole === "admin" ||
                (userRole === "creator" && event?.createdByUser === userId)) && (
                <>
                  <Grid item xs={4} sm="auto">
                    <Button
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#2074d4", ml: isMobile ? 0 : 2 }}
                      onClick={toggleEditDialog}
                    >
                      <EditIcon sx={{ marginRight: isMobile ? 0 : "5px" }} />
                      {!isMobile && !isTablet && "Edit"}
                    </Button>
                  </Grid>
                  <Grid item xs={4} sm="auto">
                    <Button
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#2074d4" }}
                      onClick={() => setDialogOpen(true)}
                    >
                      <DeleteIcon sx={{ marginRight: isMobile ? 0 : "5px" }} />
                      {!isMobile && !isTablet && "Delete"}
                    </Button>
                  </Grid>
                  <Grid item xs={4} sm="auto">
                    <Button
                      variant="contained"
                      sx={{ color: "white", backgroundColor: "#2074d4" }}
                      onClick={toggleArchiveDialog}
                    >
                      {!event.isArchived ? (
                        <>
                          <ArchiveIcon sx={{ marginRight: isMobile ? 0 : "5px" }} />
                          {!isMobile && !isTablet && "Archive"}
                        </>
                      ) : (
                        <>
                          <UnarchiveIcon sx={{ marginRight: isMobile ? 0 : "5px" }} />
                          {!isMobile && !isTablet && "Unarchive"}
                        </>
                      )}
                    </Button>
                  </Grid>
                </>
              )}
              </Grid>
              <Grid item xs={12} sm="auto">
              <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#2074d4",
                      width: "140px",
                      mt: isMobile ? 1 : 0
                    }}
                    onClick={() => {
                      toggleViewMoreDetailsDialog();
                    }}
                  >
                    {" "}
                    More Details{" "}
                  </Button>
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <Button
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#2074d4",
                        width: isMobile ? "140px" : "90px",
                      }}
                      onClick={() => {
                        toggleAttendDialog();
                      }}
                    >
                      {" "}
                      Attend{" "}
                    </Button>
                  </Grid>
            </Box>
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                justifyContent: events.length > 1 && events.findIndex(e => e._id === event._id) > 0 ? "space-between" : "end",
                alignContent: "center",
                width: "100%",
                maxWidth: 700,
                top: isMobile ? "35%" : "43%",
                transform: "translateY(-50%)",
              }}
            >
            {events.length > 1 && events.findIndex(e => e._id === event._id) > 0 && (
            <Button onClick={getPrevEvent} sx={{ filter: isMobile ? "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))" : "", p: 0, ml: 0 }}>
              <ArrowLeftIcon sx={{ fontSize: isMobile ? "40px" : "70px", backgroundColor: isMobile ? "white" : "", color: isMobile ? "grey" : "", filter:  isMobile ? "" : "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))", borderRadius: "2px" }} />
            </Button>
            )}
            {events.length > 1 && events.findIndex(e => e._id === event._id) < events.length - 1 &&  (
            <Button onClick={getNextEvent} sx={{ filter: isMobile ? "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))" : "", p: 0, mr: -2 }}>
              <ArrowRightIcon sx={{ fontSize: isMobile ? "40px" : "70px", backgroundColor: isMobile ? "white" : "", color: isMobile ? "grey" : "", filter:  isMobile ? "" : "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))", borderRadius: "2px" }} />
            </Button>
            )}
          </Box>
          </Grid>
        </Box>
        <DeleteDialog />
        <ViewMoreDetailsDialog
          isOpen={moreDetailsDialogOpen}
          event={event}
          userRole={userRole}
          dialogToggle={toggleViewMoreDetailsDialog}
        />
        <AttendDialog
          isOpen={attendDialogOpen}
          eventId={event._id}
          dialogToggle={toggleAttendDialog}
        />
        <ArchiveDialog
          isOpen={archiveDialogOpen}
          event={event}
          dialogToggle={toggleArchiveDialog}
        />
        <EditDialog isOpen={editDialogOpen} event={event} toggleEditDialog={toggleEditDialog} />
        <Snackbar
          open={Boolean(snackbarMessage)}
          onClose={() => {
            setSnackbarMessage("");
          }}
          autoHideDuration={1200}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <SnackbarContent message={snackbarMessage} sx={{ backgroundColor: "white", color: "black" }} />
        </Snackbar>
      </Box>
      </Box>
    </>
  );
};

export default EventDetail;
