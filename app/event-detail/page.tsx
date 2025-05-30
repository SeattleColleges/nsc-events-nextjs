"use client";
import { Attendee } from "@/types/attendee";
import ViewAttendeesDialog from "@/components/ViewAttendeesDialog";
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
import { ActivityDatabase } from "@/models/activityDatabase";
import Snackbar from "@mui/material/Snackbar";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
import { useArchivedEvents, useEventById, useFilteredEvents, useIsAttending, useMyEvents } from "@/utility/queries";
import { getCurrentUserId } from "@/utility/userUtils";
import CoverPhotoDialog from "@/components/CoverPhotoDialog";

interface SearchParams {
  searchParams: {
    id: string;
  };
}

const EventDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const eventIds = searchParams.get("events");
  const queryClient = useQueryClient();
  const [event, setEvent] = useState<ActivityDatabase | null>(null);
  const [events, setEvents] = useState<string[]>(() => {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
  });
  const [isAuthed, setAuthed] = useState(false);
  const [token, setToken] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [attendDialogOpen, setAttendDialogOpen] = useState(false);
  const [moreDetailsDialogOpen, setMoreDetailsDialogOpen] = useState(false);
  const [coverPhotoDialogOpen, setCoverPhotoDialogOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");

  const [attendeeCount, setAttendeeCount] = useState<number | null>(null);
  const [anonymousCount, setAnonymousCount] = useState<number | null>(null);
  const [attendeeNames, setAttendeeNames] = useState<string[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  
  const { palette } = useTheme();
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const [page, setPage] = useState(Number(searchParams.get("page")!) + 1)
  const [reachedLastPage, setReachedLastPage] = useState(false);
  const [prevPage] = useState(() => {
    const prevPage = localStorage.getItem("prevPage")
    return prevPage ? prevPage : searchParams.get("from")
  })
  const [usedData, setUsedData] = useState<ActivityDatabase[] | undefined>(undefined)

  const [isRegistered, setIsRegistered] = useState<boolean | undefined>(undefined);
  const { data: filteredEvents } = useFilteredEvents(page, prevPage === "home")
  const { data: archivedEvents } = useArchivedEvents(page, prevPage === "archived")
  const { data: myEvents } = useMyEvents(getCurrentUserId(), page, prevPage === "mine")
  const { data } = useEventById(id);
  const { data: isAttending } = useIsAttending(event?._id, userId);

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
      const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/events/remove/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
      await queryClient.refetchQueries({ queryKey: ['events', 'myEvents', 'archivedEvents'] });
      setSnackbarMessage("Successfully deleted event.");
      setTimeout(() => {
        router.refresh();
        router.push('/')
      }, 1200);
    },
    onError: () => {
      setSnackbarMessage("Failed to delete event.");
    },
  });

  useEffect(() => {
    if (prevPage) {
      localStorage.setItem("prevPage", prevPage)
    }
    if (events) {
      localStorage.setItem("events", JSON.stringify(events))
    }
    return () => {
      localStorage.removeItem("events")
      localStorage.removeItem("prevPage")
    }
  }, [events, prevPage]);

  useEffect(() => {
    switch (prevPage) {
      case "home":
        setUsedData(filteredEvents);
        break;
      case "archived":
        setUsedData(archivedEvents);
        break;
      case "mine":
        setUsedData(myEvents)
        break;
    }
    if (usedData) {
      setEvents((prevEvents) => {
        const newEvents: string[] = [...prevEvents, ...usedData.map((e: { _id: string; }) => e._id)];
        return newEvents.filter((event, index, self) =>
          index === self.findIndex((e) => e === event)
        );
      });
      setReachedLastPage(usedData.length === 0);
    }
  }, [archivedEvents, filteredEvents, myEvents, page, prevPage, queryClient, usedData]);

  // check if the user is registered for the event and set the state accordingly
  useEffect(() => {
    if (typeof isAttending === "boolean") {
      setIsRegistered(isAttending);
    }
  }, [isAttending]);

  useEffect(() => {
    if (eventIds) {
      setEvents(JSON.parse(eventIds));
    }
    if (data) {
      setEvent(data);
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
  }, [queryClient, data, eventIds]);

  
  useEffect(() => {
    const fetchAttendeeData = async () => {
      if (!event?._id || userRole !== "admin" &&
                    (userRole === "creator" && event?.createdByUser !== userId)) {
        return;
      }
      try {
        const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/event-registration/event/${event._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAttendeeCount(data.count);
        setAnonymousCount(data.anonymousCount);
        setAttendeeNames(data.attendeeNames || []);
        setAttendees(data.attendees || []);
      } catch (err) {
        console.error("Failed to fetch attendee data", err);
      }
    };
  
    fetchAttendeeData();
  }, [event, userRole, token]);
  
  const toggleAttendDialog = () => {
    if (token === "") {
      router.push("auth/sign-in");
    } else {
      setAttendDialogOpen(!attendDialogOpen);
    }
  };

  const toggleCoverPhotoDialog = () => {
    setCoverPhotoDialogOpen(!coverPhotoDialogOpen);
  };

  const toggleViewMoreDetailsDialog = () => {
    setMoreDetailsDialogOpen((prev) => !prev);
  };

  const toggleArchiveDialog = () => {
    setArchiveDialogOpen(!archiveDialogOpen);
  };

  const getNextEvent = () => {
    const currentIndex = events.findIndex(e => e === event?._id);
  
    if (!reachedLastPage && currentIndex !== -1) {
      setPage(num => num + 1);
    }
  
    if (currentIndex >= 0 && currentIndex < events.length - 1) {
      const nextEvent = events[currentIndex + 1];
      console.log("Navigating to:", nextEvent);
      router.push(`/event-detail?id=${nextEvent}`);
    }
  };

  const getPrevEvent = () => {
    const currentIndex = events.findIndex(e => e === event?._id);
    if (currentIndex > 0) {
      const prevEvent = events[currentIndex - 1];
      console.log("Navigating to:", prevEvent);
      router.push(`/event-detail?id=${prevEvent}`);
    }
  };

  // Debugging console logs
  useEffect(() => {
    console.log("Events: ", events);
    console.log("Current Event: ", event);
  }, [events, event]);

  const unattendEvent = async ({ eventId, userId }: { eventId: string; userId: string }) => {
    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }, 
      body: JSON.stringify({ userId, eventId })
    };

    try {
      const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/event-registration/unattend`, options);
      if (!response.ok) {
        throw new Error(`Failed to unregister: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error unregistering:", error);
      throw error;
    }
  }
  
  const { mutate: unregisterEventMutation } = useMutation({
    mutationFn: unattendEvent,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['events', 'myEvents', 'archivedEvents'] });
      setSnackbarMessage("Successfully unregistered from event.");
      setIsRegistered(false);      
    },
    onError: () => {
      setSnackbarMessage("Failed to unregister from event.");
    },
  });

  const handleUnregister = async () => {
    const userId = getCurrentUserId();
    if (event && event._id && userId) {
      unregisterEventMutation({ eventId: event._id, userId });
    }    
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0)",
            zIndex: 1,
          }}
        >
          <Box style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            borderRadius: "15px",
            width: "800px",
            marginBottom: "10vh"
          }}
            sx={{
              minHeight: "69vh",
              maxHeight: "100vh",
              width: "105vh",
              marginTop: 2,
              backgroundColor: isMobile ? "" : containerColor
            }}
          >
            
            <Card sx={{ width: isMobile ? "41vh" : "50vh", maxHeight: '100vh', overflowY: 'auto', mt: isMobile ? 5 : "", marginBottom: 3 }}>
            <Box sx={{ position: "relative", display: "inline-block", width: "100%" }}>
                <CardMedia
                  component="img"
                  image={event.eventCoverPhoto}
                  alt={event.eventTitle}
                  sx={{ height: "37vh", width: "100%", objectFit: "cover" }}
                />
                { event.eventCoverPhoto && (userRole === "admin" || (userRole === "creator" && event.createdByUser === userId)) && 
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setCoverPhotoDialogOpen(true)}
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      textTransform: "none",
                      flex: "0 0 auto",
                      zIndex: 1
                    }}
                  >
                    <AddPhotoAlternateIcon sx={{ marginRight: "5px" }} />
                    {isMobile ? "" : "Cover Photo"}
                  </Button>
                }
              </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {event.eventTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ pb: 1 }}>
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

                {(userRole === "admin" ||
                    (userRole === "creator" && event?.createdByUser === userId)) && attendeeCount !== null && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    Attendees ({attendeeCount})
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => setViewDialogOpen(true)}
                    sx={{ mt: 1 }}
                  >
                    View Attendees
                  </Button>
                  <ViewAttendeesDialog
                    open={viewDialogOpen}
                    onClose={() => setViewDialogOpen(false)}
                    attendees={attendees}
                  />
                </Box>
              )}


              </CardContent>
            </Card>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 1 : 2,
                  flexWrap: "wrap",
                  marginTop: "2px",
                  width: "100%",
                }}
              >
                <Grid container spacing={2} justifyContent="center" alignItems="center" >
                  {(userRole === "admin" ||
                    (userRole === "creator" && event?.createdByUser === userId)) && (
                      <>
                        <Grid
                          size={{
                            xs: 2,
                            sm: "auto"
                          }}>
                          <Button
                            variant="contained"
                            sx={{
                              color: "white",
                              backgroundColor: "#2074d4",
                              ml: isMobile ? 0 : 2,
                              padding: "8px 16px",
                              minWidth: "120px",
                              width: isMobile ? "120" : "auto",
                              marginBottom: isMobile ? "5px" : "0",
                            }}
                            onClick={toggleEditDialog}
                          >
                            <EditIcon sx={{ marginRight: isMobile ? 0 : "5px" }} />
                            {!isMobile && !isTablet && "Edit"}
                          </Button>
                        </Grid>
                        <Grid
                          size={{
                            xs: 2,
                            sm: "auto"
                          }}>
                          <Button
                            variant="contained"
                            sx={{
                              color: "white",
                              backgroundColor: "#2074d4",
                              padding: "8px 16px",
                              minWidth: "120px",
                              width: isMobile ? "120" : "auto",
                              marginBottom: isMobile ? "5px" : "0",
                            }}
                            onClick={() => setDialogOpen(true)}
                          >
                            <DeleteIcon sx={{ marginRight: isMobile ? 0 : "5px" }} />
                            {!isMobile && !isTablet && "Delete"}
                          </Button>
                        </Grid>
                        <Grid
                          size={{
                            xs: 2,
                            sm: "auto"
                          }}>
                          <Button
                            variant="contained"
                            sx={{
                              color: "white",
                              backgroundColor: "#2074d4",
                              padding: "8px 16px",
                              minWidth: "120px",
                              width: isMobile ? "120" : "auto",
                              marginBottom: isMobile ? "5px" : "0",
                            }}
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
                <Grid
                  size={{
                    xs: 12,
                    sm: "auto"
                  }}>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#2074d4",
                      width: isMobile ? "120" : "auto",
                      padding: "8px 16px",
                      overflow: "hidden",
                      marginTop: isMobile ? 1 : 0,
                    }}
                    onClick={() => {
                      toggleViewMoreDetailsDialog();
                    }}
                  >
                    {" "}
                    More Details{" "}
                  </Button>
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: "auto"
                  }}>
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: isRegistered ? "red" : "#2074d4",
                      width: isMobile ? "120" : "auto",
                      padding: "8px 16px",
                      overflow: "hidden",
                      marginTop: isMobile ? 1 : 0,
                    }}
                    onClick={() => {
                      if (isRegistered) {
                        handleUnregister();
                      } else {
                        toggleAttendDialog();
                      }
                    }}
                  >
                    {isRegistered ? "Unregister" : "Attend"}
                  </Button>
                </Grid>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: events.length > 1 && events.findIndex(e => e === event?._id) > 0 ? "space-between" : "end",
                  alignContent: "center",
                  width: "100%",
                  maxWidth: 700,
                  top: isMobile ? "35%" : "43%",
                  transform: "translateY(-50%)",
                }}
              >
                {events.length > 1 && events.findIndex(e => e === event?._id) > 0 && (
                  <Button onClick={getPrevEvent} sx={{ filter: isMobile ? "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))" : "", p: 0, ml: 0 }}>
                    <ArrowLeftIcon sx={{ fontSize: isMobile ? "40px" : "70px", backgroundColor: isMobile ? "white" : "", color: isMobile ? "grey" : "", filter: isMobile ? "" : "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))", borderRadius: "2px" }} />
                  </Button>
                )}
                {events.length > 1 && events.findIndex(e => e === event?._id) < events.length - 1 && (
                  <Button onClick={getNextEvent} sx={{ filter: isMobile ? "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))" : "", p: 0, mr: -2 }}>
                    <ArrowRightIcon sx={{ fontSize: isMobile ? "40px" : "70px", backgroundColor: isMobile ? "white" : "", color: isMobile ? "grey" : "", filter: isMobile ? "" : "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2))", borderRadius: "2px" }} />
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
            userId={userId} />
          <AttendDialog
            isOpen={attendDialogOpen}
            eventId={event._id}
            dialogToggle={toggleAttendDialog}
            onSuccess={() => setIsRegistered(true)}
          />
          <ArchiveDialog
            isOpen={archiveDialogOpen}
            event={event}
            dialogToggle={toggleArchiveDialog}
          />
          <CoverPhotoDialog 
            isOpen={coverPhotoDialogOpen}
            dialogToggle={toggleCoverPhotoDialog}
            eventId={event._id}
            setEvent={setEvent}
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
