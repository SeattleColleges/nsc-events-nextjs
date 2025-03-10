import { Box, Card, CardContent, CardHeader, CardMedia, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import Grid from '@mui/material/Grid2'; 
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
    <Grid size={{ xs: 12, sm: 6, md: 3}} key={event._id}>
        <Box sx={{ margin: 0, width: "90%", minWidth: !(isMobile || isTablet) ? 460 : 260, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Card sx={{ display: 'flex', flexDirection: 'row', height: "auto", marginBlock: 2, width: "100%" }}>


                <CardMedia
                  component="img"
                  sx={{ height: "auto", objectFit: "cover", marginBlock: 2, marginLeft: 2, minWidth: 100, maxWidth: 200 }}
                  image={event.eventCoverPhoto}
                  alt={event.eventTitle}
                />
                <CardContent sx={{ display: "flex", flexDirection: "column", width: "100%" }} >
                  <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", minWidth: 200, width: "100%" }}>
                    <CardHeader  
                      sx={{ width: "100%", minWidth: 200, maxWidth: 300, backgroundColor: "rgb(0, 68, 158)", color: "white", borderRadius: 2, boxShadow: 2, padding: 1, height: 30, display: "flex", alignItems: "center"}}
                      title={ 
                        <Typography sx={{ fontSize: 16, fontWeight: "500", justifyContent: "center", paddingLeft: 2 }}>
                          { event.eventTitle }
                        </Typography>
                      }
                    />
                    <Typography sx={{ backgroundColor: "lightgreen", width: 60, height: 60, borderRadius: 2, display: "flex", flexWrap: "wrap", fontWeight: "bolder", fontSize: 22, lineHeight: 1, alignItems: "center", textAlign: "center"}}>
                      Jul. 4th
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%"}}>
                    <Box sx={{padding: 2}}>
                      <Typography sx={{display: "flex", flexDirection: "column"}}>
                          Location: {event.eventLocation}
                      </Typography>
                      <Typography sx={{display: "flex", flexDirection: "column"}}>
                          Time: {formatDate(event.eventDate)}
                      </Typography>

                      <Typography sx={{display: "flex", flexDirection: "column"}}>
                          Description: {event.eventDescription}
                      </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                      <Typography sx={{}}>
                        Tags: {event.eventTags}
                      </Typography>
                      <Button size="small" sx={{color: "rgb(0, 68, 158)", borderRadius: 2, boxShadow: 2, padding: 1, height: 30, display: "flex", alignItems: "center"}}>
                        See more details
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
            </Card>
        </Box>
    </Grid>
  </div>
)
}


export default EventCard;
