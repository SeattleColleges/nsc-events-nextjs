import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { ActivityDatabase } from "@/models/activityDatabase";
import { useFilteredEvents } from "@/utility/queries";
import { formatDate } from "@/utility/dateUtils";

export function UpcomingEvent() {
  const [events, setEvents] = useState<ActivityDatabase[]>([]);
  const { data } = useFilteredEvents(1, true);

  useEffect(() => {
    if (data) {
      setEvents((prevEvents) => {
        const newEvents = [...prevEvents, ...data];
        const uniqueEvents = newEvents.filter((event, index, self) =>
          index === self.findIndex((e) => e._id === event._id)
        );
        return uniqueEvents;
      });
    }
  }, [data]);

  return (
    <Grid container spacing={1}>
      {data?.slice(0, 1).map((event: ActivityDatabase) => (
        <Grid item xs={12} key={event._id}>
          <Box sx={{ width: 350 }}>
            <Box
              sx={{
                position: "absolute",
                transform: "translate(45%, -91.5%)",
              }}
            >
              <Image
                src="/images/NSC_Mascot_2C_cropped.png"
                alt="NSC Mascot"
                width={200}
                height={150}
              />
            </Box>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: 0,
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 200, objectFit: "cover" }}
                image={event.eventCoverPhoto}
                alt={event.eventTitle}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" align="center">
                  {event.eventTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center" marginTop="5px">
                  Date: {formatDate(event.eventDate)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Link key={event._id} href={
                  {
                    pathname: "/event-detail",
                    query: {
                      id: event._id,
                      events: JSON.stringify(events.map(e => e._id)),
                      from: 'home'
                    },
                  }
                } >
                  <Button size={"small"}>Details</Button>
                </Link>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default UpcomingEvent;
