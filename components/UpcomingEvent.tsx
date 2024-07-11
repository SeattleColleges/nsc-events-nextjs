import React from "react";
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
  const { data, isLoading, isError } = useFilteredEvents(1, true);

  if (isLoading) {
    return <span>Loading events...</span>;
  } else if (isError) {
    return <span>Error when fetching events...</span>;
  } else {
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
                  <Link
                    href={{
                      pathname: "/event-detail",
                      query: {
                        id: event._id,
                      },
                    }}
                  >
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
}

export default UpcomingEvent;
