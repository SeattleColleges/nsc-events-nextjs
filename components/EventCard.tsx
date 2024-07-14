import { Box, Card, CardContent, CardMedia, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ActivityDatabase } from "@/models/activityDatabase";
import React from 'react'
import { formatDate } from "@/utility/dateUtils";

// declare the event prop that will get passed to the component
interface EventCardProps {
    event: ActivityDatabase; 
  }

function EventCard({ event }: EventCardProps) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  return (
    <div>
      <Grid item xs={12} key={event._id}>
          <Box sx={{ margin: "0 auto", height: (isMobile || isTablet) ? 325 : 130, width: isMobile ? 260 : isTablet ? 400 : "80%", minWidth: !(isMobile || isTablet) ? 460 : 260, display: "block" }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', marginTop: 0 }}>
                  {(isMobile || isTablet) && (
                      <CardMedia
                        component="img"
                        sx={{ height: 200, objectFit: "cover" }}
                        image={event.eventCoverPhoto}
                        alt={event.eventTitle}
                      />
                  )}
                  <CardContent sx={{ flexGrow: 1 }} >
                      <Typography variant="h5" align={(isMobile || isTablet) ? "center" : "left"}>
                          {event.eventTitle}
                      </Typography>
                      <Typography variant="body2" align={(isMobile || isTablet) ? "center" : "right"} color="text.secondary">
                          Date: { formatDate(event.eventDate) }
                      </Typography>
                  </CardContent>
              </Card>
          </Box>
      </Grid>
    </div>
  )
}

export default EventCard



