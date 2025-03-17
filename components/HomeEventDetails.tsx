import { ActivityDatabase } from '@/models/activityDatabase';
import { Box, Card, CardContent, CardHeader, CardMedia, Typography, useMediaQuery, useTheme, Button, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react'

// props used to pass the event data to the component
interface HomeEventDetailsProps {
    event: ActivityDatabase;
}

function HomeEventDetails({ event }: HomeEventDetailsProps) {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    return (
        <div>
            <Grid key={event._id} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBlock: (isMobile || isTablet) ? 2 : 1, }}>
                <Box sx={{ width: (isMobile || isTablet) ? "100vw" : "100%", display: "flex", flexDirection: "column", justifyContent: "center", textWrap: "balance" }}>
                    <Paper sx={{ p: 4, height: "88vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "auto",
                                paddingBlock: 2,
                                borderBottom: "3px solid #333",
                            }}
                        >
                            <CardMedia
                                component="img"
                                src={event.eventCoverPhoto}
                                alt={event.eventTitle}
                                sx={{
                                    height: "300px",
                                    width: '300px',
                                    objectFit: "cover",
                                }}
                            />

                            <Box sx={{ paddingInline: 1, width: "100%" }}>
                                <Box
                                    sx={{
                                        backgroundColor: theme.palette.primary.dark,
                                        color: "white",
                                        borderRadius: 2,
                                        boxShadow: 2,
                                        padding: 1,
                                        height: "auto",
                                        mb: 2
                                    }}
                                >
                                    <Typography variant="h5" color="white">
                                        {event.eventTitle}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography>
                                            Location: {event.eventLocation}
                                        </Typography>
                                        <Typography>
                                            Time: {event.eventStartTime}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{ backgroundColor: theme.palette.secondary.light, width: 60, height: 60, borderRadius: 2, display: "flex", alignItems: "center", textAlign: "center" }}
                                    >
                                        <Typography sx={{ fontWeight: "700", fontSize: 22, lineHeight: 1 }}>
                                            Jul. 4th
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%" }}>
                            <Box>
                                <Typography variant="h4" color="text.secondary" sx={{ marginBlock: 2 }}>
                                    Come to workshop
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {event.eventDescription}
                                </Typography>
                                <Typography>
                                    {event.eventNote}
                                </Typography>
                            </Box>
                            <Box>
                                <Box>
                                    <Typography variant='h6'>
                                        Contact Info
                                    </Typography>
                                    <Typography>
                                        email: {event.eventContact}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "row" }}>
                                    <Typography>
                                        Tags:
                                    </Typography>
                                    {event.eventTags.map((tag, index) => (
                                        <Box key={index} sx={{ backgroundColor: theme.palette.secondary.light, borderRadius: 1, padding: '2px 6px', margin: '4px', display: 'inline-block', fontSize: 10, height: 20 }}>
                                            {tag}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Grid >
        </div >
    )
}

export default HomeEventDetails;
