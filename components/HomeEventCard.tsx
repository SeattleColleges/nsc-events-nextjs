"use client";
import { Box, Card, CardContent, CardHeader, CardMedia, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ActivityDatabase } from "@/models/activityDatabase";
import React from 'react'
import { formatDate } from "@/utility/dateUtils";
import { usePathname, useRouter } from 'next/navigation';

// declare the event prop that will get passed to the component
interface EventCardProps {
    event: ActivityDatabase;
}

function HomeEventsCard({ event }: EventCardProps) {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    const { palette } = useTheme();

    const darkImagePath = '/images/white_nsc_logo.png';
    const lightImagePath = '/images/blue_nsc_logo.png';
    const googlePlayImage = '/images/google_play.png'
    const imagePath = palette.mode === "dark" ? darkImagePath : lightImagePath;

    return (
        <Box sx={{ width: (isMobile || isTablet) ? "100vw" : "100%", display: "flex", flexDirection: "column", justifyContent: "center", textWrap: "balance", p: 2, gap: 2 }}>
            <Card sx={{ display: 'flex', flexDirection: 'row',  maxWidth: "700", minHeight: 300, boxShadow: 2, borderRadius: 2, overflow: "hidden", }}>
                {!isMobile && (
                    <CardMedia
                        component="img"
                        sx={{ height: "auto", objectFit: "cover", marginBlock: 2, marginLeft: 2, minWidth: 100, maxWidth: 200 }}
                        image={event.eventCoverPhoto}
                        alt={event.eventTitle}
                    />
                )}
                <CardContent sx={{ display: "flex", flexDirection: "column", width: "100%" }} >
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", minWidth: 200, width: "100%" }}>
                        <CardHeader
                            sx={{ width: "100%", maxWidth: "auto", height: "auto", minHeight: 40, backgroundColor: palette.primary.dark, color: palette.primary.contrastText, borderRadius: 2, boxShadow: 2, padding: 1, mr: 1, display: "flex", alignItems: "center" }}
                            title={
                                <Typography sx={{ fontSize: (isMobile || isTablet) ? "1rem" : "1.5rem", fontWeight: "300", justifyContent: "center", paddingLeft: 2, fontFamily: "font-serif" }}>
                                    {event.eventTitle}
                                </Typography>
                            }
                        />
                        <Typography sx={{ backgroundColor: palette.secondary.light, width: 60, height: 60, borderRadius: 2, display: "flex", flexWrap: "wrap", fontWeight: "bolder", fontSize: 22, lineHeight: 1, alignItems: "center", textAlign: "center" }}>
                            { new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%" }}>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ mt: 2, mb: 2 }}>
                                <Typography sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", fontFamily: "font-serif" }}>
                                    Location: {event.eventLocation}
                                </Typography>
                                <Typography sx={{ fontWeight: "bold", display: "flex", flexDirection: "row", fontFamily: "font-serif" }}>
                                    Time: { formatDate(event.eventDate) }
                                </Typography>
                            </Box>
                            <Typography sx={{ display: "flex", flexDirection: "column", fontFamily: "font-serif" }}>
                                Description: {event.eventDescription}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Typography>
                                Tags:
                                {event.eventTags.map((tag, index) => (
                                    <Box key={index} sx={{ backgroundColor: palette.secondary.light, borderRadius: 1, padding: '2px 6px', margin: '2px', display: 'inline-block', fontSize: 10, height: 20 }}>
                                        {tag}
                                    </Box>
                                ))}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}


export default HomeEventsCard;
