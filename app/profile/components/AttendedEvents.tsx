"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";

const URL = process.env.NSC_EVENTS_PUBLIC_API_URL!;

interface AttendedEvent {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventStartTime: string;
}

interface AttendedEventsProps {
  userId: string;
  token: string;
}

type PanelProps = {
  items: AttendedEvent[];
  emptyMessage: string;
  onRequestUnattend?: (eventId: string, eventTitle: string) => void;
};

interface EventCardProps extends AttendedEvent {
  onRequestUnattend?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  eventTitle,
  eventDate,
  eventStartTime,
  onRequestUnattend,
}) => {
  const date = eventDate.slice(0, 10);
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        mb: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h6">{eventTitle}</Typography>
      <Typography variant="body2">
        {date} at {eventStartTime}
      </Typography>
      {onRequestUnattend && (
        <Button
          size="small"
          color="error"
          onClick={onRequestUnattend}
          sx={{ mt: 1 }}
        >
          Unregister
        </Button>
      )}
    </Box>
  );
};

const Panel: React.FC<PanelProps> = ({
  items,
  emptyMessage,
  onRequestUnattend,
}) => {
  if (items.length === 0) {
    return <Typography color="text.secondary">{emptyMessage}</Typography>;
  }

  return (
    <>
      {items.map((evt) => (
        <EventCard
          key={evt.eventId}
          {...evt}
          onRequestUnattend={
            onRequestUnattend
              ? () => onRequestUnattend(evt.eventId, evt.eventTitle)
              : undefined
          }
        />
      ))}
    </>
  );
};

export const AttendedEvents: React.FC<AttendedEventsProps> = ({
  userId,
  token,
}) => {
  const theme = useTheme();
  const [events, setEvents] = useState<AttendedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<{
    id: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${URL}/event-registration/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const data = await res.json();
        setEvents(data);
      } catch (err: any) {
        setError(err.message || "Failed to load attended events");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, token]);

  const today = format(new Date(), "yyyy-MM-dd");

  const upcoming = events.filter((e) => {
    const eventDate = e.eventDate.slice(0, 10);
    return eventDate >= today;
  });

  const past = events.filter((e) => {
    const eventDate = e.eventDate.slice(0, 10);
    return eventDate < today;
  });

  const requestUnattend = (eventId: string, eventTitle: string) => {
    console.log("Requesting to unregister:", eventId, eventTitle);
    setPendingEvent({ id: eventId, title: eventTitle });
    setConfirmOpen(true);
  };

  const confirmUnattend = async () => {
    if (!pendingEvent) return;
    try {
      const res = await fetch(`${URL}/event-registration/unattend`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, eventId: pendingEvent.id }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      setEvents((prev) => prev.filter((e) => e.eventId !== pendingEvent.id));
    } catch (err) {
      console.error("Failed to unregister:", err);
    } finally {
      setConfirmOpen(false);
      setPendingEvent(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        mt: 3,
        display: "flex",
        flexDirection: "column",
        height: "500px", // fill parent
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={(_, v) => setTabIndex(v)}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab label={`Upcoming (${upcoming.length})`} />
        <Tab label={`Past (${past.length})`} />
      </Tabs>
      {/* wrap both panels in one scrollable flex‐child */}
      <Box
        sx={{
          flexGrow: 1, // take all leftover
          overflowY: "auto", // and scroll
          mt: 2,
        }}
      >
        <Box role="tabpanel" hidden={tabIndex !== 0}>
          {tabIndex === 0 && (
            <Panel
              items={upcoming}
              emptyMessage="No upcoming events."
              onRequestUnattend={requestUnattend}
            />
          )}
        </Box>
        <Box role="tabpanel" hidden={tabIndex !== 1}>
          {tabIndex === 1 && (
            <Panel items={past} emptyMessage="No past events." />
          )}
        </Box>
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Unregister</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to unregister for{" "}
            <strong>{pendingEvent?.title}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No</Button>
          <Button color="error" onClick={confirmUnattend}>
            Yes, Unregister
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
