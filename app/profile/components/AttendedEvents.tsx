"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Button,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";

const URL = process.env.NSC_EVENTS_PUBLIC_API_URL!;

interface AttendedEvent {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventStartTime: string;
  eventLocation: string;
  eventHost: string;
}

interface AttendedEventsProps {
  userId: string;
  token: string;
}

type PanelProps = {
  items: AttendedEvent[];
  emptyMessage: string;
  onUnattend: (eventId: string) => Promise<void>;
};

const EventCard: React.FC<AttendedEvent & { onUnattend: () => void }> = ({
  eventTitle,
  eventDate,
  eventStartTime,
  eventLocation,
  eventHost,
  onUnattend,
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
        {date} @ {eventStartTime}
      </Typography>
      <Typography variant="body2">Location {eventLocation}</Typography>
      <Typography variant="body2">Host: {eventHost}</Typography>
      <Button size="small" color="error" onClick={onUnattend} sx={{ mt: 1 }}>
        Unregister
      </Button>
    </Box>
  );
};

const Panel: React.FC<PanelProps> = ({ items, emptyMessage, onUnattend }) => {
  return items.length > 0 ? (
    items.map((evt) => (
      <EventCard
        key={evt.eventId}
        {...evt}
        onUnattend={() => onUnattend(evt.eventId)}
      />
    ))
  ) : (
    <Typography color="text.secondary">{emptyMessage}</Typography>
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
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setEvents(data);
      } catch (err: any) {
        setError(err.message || "Failed to load attended events");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, token]);

const today = format(new Date(), 'yyyy-MM-dd'); // local today as string

const upcoming = events.filter((e) => {
  const eventDate = e.eventDate.slice(0, 10);
  return eventDate >= today;
});

const past = events.filter((e) => {
  const eventDate = e.eventDate.slice(0, 10);
  return eventDate < today;
});

  // DELETE /event-registration/unattend
  const handleUnattend = async (eventId: string) => {
    try {
      const res = await fetch(`${URL}/event-registration/unattend`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, eventId }),
      });
      if (!res.ok) throw new Error(await res.text());
      // remove from local state
      setEvents((prev) => prev.filter((e) => e.eventId !== eventId));
    } catch (err) {
      console.error("Failed to unregister:", err);
    }
  };

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: "center" }}>
        {error}
      </Typography>
    );

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
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

      <Box role="tabpanel" hidden={tabIndex !== 0} sx={{ mt: 2 }}>
        {tabIndex === 0 && (
          <Panel
            items={upcoming}
            emptyMessage="No upcoming events."
            onUnattend={handleUnattend}
          />
        )}
      </Box>
      <Box role="tabpanel" hidden={tabIndex !== 1} sx={{ mt: 2 }}>
        {tabIndex === 1 && (
          <Panel
            items={past}
            emptyMessage="No past events."
            onUnattend={handleUnattend}
          />
        )}
      </Box>
    </Box>
  );
};
