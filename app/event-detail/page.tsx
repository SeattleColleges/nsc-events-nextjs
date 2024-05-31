
'use client';

import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  SnackbarContent,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityDatabase, ActivityDatabase } from "@/models/activityDatabase";
import Snackbar from "@mui/material/Snackbar";
import styles from "@/app/home.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useRouter } from "next/navigation";
import AttendDialog from "@/components/AttendDialog";
import ArchiveDialog from "@/components/ArchiveDialog";
import EditDialog from "@/components/EditDialog";

import { formatDate } from "@/utility/dateUtils";
import ViewMoreDetailsDialog from "@/components/ViewMoreDetailsDialog";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { set } from "mongoose";

interface Event {
  _id: string;
  eventCoverPhoto: string;
  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  eventStartTime: string;
  eventEndTime: string;
  eventLocation: string;
}

interface SearchParams {
  searchParams: {
    id: string;
  };
}

const EventDetail = ({ searchParams }: SearchParams) => {
  const router = useRouter();

  const [event, setEvent] = useState<ActivityDatabase>(activityDatabase);
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
  const queryClient = useQueryClient();

  const DeleteDialog = () => (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      aria-describedby="Dialogue to confirm event deletion"
    >
      <DialogTitle>{"Delete Event?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this event?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            deleteEventMutation(event._id);
            setDialogOpen(false);
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );


  const toggleEditDialog = () => {
    setEditDialogOpen(!editDialogOpen);
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/events/remove/${id}`, {
        method: 'DELETE',

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.error('error: ', error);

    }
  };

  const { mutate: deleteEventMutation } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      setSnackbarMessage("Successfully deleted event.");
      setTimeout(() => {
        router.push("/");
      }, 1200);
    },
    onError: () => {
      setSnackbarMessage("Failed to delete event.");
    }
  });



/*
    if (!searchParams.id) {
      console.log("SearchParams id not available yet");
      return;
    }

    const getEvents = async () => {
      console.log("Fetching events with ID: ", searchParams.id);
      try {
        const response = await fetch(`http://localhost:3000/api/events`);
        if (response.ok) {
          const allEvents: ActivityDatabase[] = await response.json();
          console.log("Fetched events: ", allEvents);
          setEvents(allEvents);
          const currEvent = allEvents.find(event => event._id === searchParams.id);
          if (currEvent) {
            setEvent(currEvent);
          } else {
            console.error("Current event not found: ", searchParams.id);
          }
        } else {
          console.error("Failed to fetch events, HTTP status: ", response.status);
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
      getEvents();

      const token = localStorage.getItem("token");
      setToken(token ?? "");
      if (token) {
        const userRole = JSON.parse(atob(token.split(".")[1])).role;
        setAuthed(userRole === "creator" || userRole === "admin");
      }
    }
*/

  useEffect(() => {

    const getEvents = async () => {
      const events = queryClient.getQueryData<ActivityDatabase[]>(['event']);
      if (events && events.length > 0) {
        setEvents(events);
        const selectedEvent = events.find(event => event._id === searchParams.id) as ActivityDatabase;
        console.log("selectedEvent: ", selectedEvent);
        if (selectedEvent) {
          setEvent(selectedEvent);
        }
      } else {
        const response = await fetch(`http://localhost:3000/api/events`);
        if (response.ok) {
          const evt: ActivityDatabase[] = await response.json();
          console.log("Fetched event: ", evt);
          setEvents(evt);
          const selectedEvent = evt.find(event => event._id === searchParams.id);
          if (selectedEvent) {
            setEvent(selectedEvent); // assuming there's only one event in response
          }
        }
      }

      // else if (searchParams.id) {
      //   const response = await fetch(`http://localhost:3000/api/events/find/${searchParams.id}`);
      //   if (response.ok) {
      //     const evt = await response.json();
      //     console.log("Fetched event: ", evt);
      //     setEvent(evt);
      //     setEvents([evt]); // assuming there's only one event in response
  
      //   }
      // }

    };

    getEvents();
    
    const token = localStorage.getItem("token");
    setToken(token ?? "");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setAuthed(userRole === "creator" || userRole === "admin");
    }
  }, [queryClient, searchParams.id]);


  const toggleAttendDialog = () => {
    if (token === '') {
      router.push("auth/sign-in");
    } else {
      setAttendDialogOpen(!attendDialogOpen);
    }
  };

  const toggleArchiveDialog = () => {
    setArchiveDialogOpen(!archiveDialogOpen);
  };

  const getNextEvent = () => {
    const currentIndex = events.findIndex(e => e._id === event._id);
    if (currentIndex >= 0 && currentIndex < events.length - 1) {
      const nextEvent = events[currentIndex + 1];
      console.log("Navigating to:", nextEvent._id);
      router.push(`/eventDetails?id=${nextEvent._id}`);
    }
  };

  const getPrevEvent = () => {
    const currentIndex = events.findIndex(e => e._id === event._id);
    if (currentIndex > 0) {
      const prevEvent = events[currentIndex - 1];
      console.log("Navigating to:", prevEvent._id);
      router.push(`/eventDetails?id=${prevEvent._id}`);
    }
  };

  // Debugging console logs
  useEffect(() => {
    console.log("Events: ", events);
    console.log("Current Event: ", event);
  }, [events, event]);

  return (
    <Box className={styles.container}>
      {events.length > 1 && events.findIndex(e => e._id === event._id) > 0 && (
        <Button onClick={getPrevEvent}>
          <ArrowBackIosIcon sx={{ color: 'white', fontSize: '100px' }} />
        </Button>
      )}
      <Box className={styles.formContainer} sx={{ minHeight: '69vh', maxHeight: '100vh', width: '100vh', marginTop: '10vh' }}>
        <Card sx={{ width: '45vh', minHeight: '59vh', maxHeight: '100vh', marginBottom: '5vh' }}>
          <CardMedia
            component="img"
            image={event.eventCoverPhoto}
            alt={event.eventTitle}
            sx={{ height: '37vh' }}
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
        <div style={{ width: '100vh', display: 'flex' }}>
          <div style={{ display: 'flex', width: '100vh', gap: '25px', justifyContent: 'center', alignItems: 'center', marginLeft: '13vh' }}>
            {isAuthed && (
              <>
                <Button variant='contained' sx={{ color: 'white', backgroundColor: '#2074d4', width: '125px' }} onClick={toggleEditDialog}>
                  <EditIcon sx={{ marginRight: '5px' }} /> Edit
                </Button>
                <Button variant='contained' sx={{ color: 'white', backgroundColor: '#2074d4', width: '125px' }} onClick={() => setDialogOpen(true)}>
                  <DeleteIcon sx={{ marginRight: '5px' }} /> Delete
                </Button>
                <Button variant='contained' sx={{ color: 'white', backgroundColor: '#2074d4', width: '125px' }} onClick={toggleArchiveDialog}>
                  <ArchiveIcon sx={{ marginRight: '5px' }} /> Archive
                </Button>
              </>
            )}
          </div>
          <Button variant='contained' sx={{ color: 'white', backgroundColor: '#2074d4', width: '125px', marginRight: '50px' }} onClick={toggleAttendDialog}>
            Attend
          </Button>
        </div>
      </Box>
      <DeleteDialog />
      <AttendDialog isOpen={attendDialogOpen} eventId={event._id} dialogToggle={toggleAttendDialog} />
      <ArchiveDialog isOpen={archiveDialogOpen} eventId={event._id} dialogToggle={toggleArchiveDialog} />
      <EditDialog isOpen={editDialogOpen} event={event} toggleEditDialog={toggleEditDialog} />
      <Snackbar
        open={Boolean(snackbarMessage)}
        onClose={() => setSnackbarMessage('')}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        message={snackbarMessage}
      />

      {events.length > 1 && events.findIndex(e => e._id === event._id) < events.length - 1 && (
        <Button onClick={getNextEvent}>
          <ArrowForwardIosIcon sx={{ color: 'white', fontSize: '100px' }} />
        </Button>
      )}
    </Box>

  );
};

export default EventDetail;
