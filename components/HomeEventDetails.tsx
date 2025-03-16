import { ActivityDatabase } from '@/models/activityDatabase';
import { Box, Card, CardContent, CardHeader, CardMedia, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
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
                <Box sx={{ width: (isMobile || isTablet) ? "100vw" : "100%", display: "flex", flexDirection: "column", justifyContent: "center", textWrap: "balance", p: 2 }}>
                    {event.eventTitle}
                </Box>
            </Grid>
        </div >
    )
}

export default HomeEventDetails;
