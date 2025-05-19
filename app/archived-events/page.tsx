'use client';

import useAuth from "@/hooks/useAuth";
import { Button, Checkbox, Container, Grid, IconButton, Menu, MenuItem, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useMemo, useState } from "react";
import { useArchivedEvents } from "@/utility/queries";
import UnauthorizedPageMessage from "../../components/UnauthorizedPageMessage";
import { ActivityDatabase } from "@/models/activityDatabase";
import EventCard from "../../components/EventCard";
import Link from "next/link";

const ArchivedEvents = () => {

    const { isAuth, user } = useAuth();
    const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const [page, setPage] = useState(1);
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false);
    const { data } = useArchivedEvents(page, true);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const memoizedTheme = useMemo(() => theme, [theme.palette.mode]); // this is an idea for dark mode bug fix 
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;

    const options = [
        "place",
        "holder",
        "menu",
        "options"
    ]
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (
        _event: React.ChangeEvent<unknown>, value: number
    ) => {
        setPage(value);
    };

    useEffect(() => {
        if (data) {
            if (isMobile) {
                setEvents((prevEvents) => [...prevEvents, ...data]);
                setHasReachedLastPage(data.length < 5);
            } else {
                setEvents(data);
            }
        }
    }, [data, isMobile]);

    const handleLoadMoreEvents = () => {
        setPage((page) => page + 1);
    };

    if (isAuth && (user?.role === 'admin' || user?.role === 'creator')) {
        if (isMobile) {
            return (
                <Container maxWidth={false}>
                    <Typography fontSize={"1.75rem"} textAlign={"center"} padding={"1rem"} marginTop={"1rem"} marginBottom={"1rem"}>
                        Archived Events
                    </Typography>
                    <Grid container gap={4}>
                        <TextField id="outlined-search" label="Search field" type="search" defaultValue="Event Name" helperText="Search by event name" />
                        <TextField id="outlined-search" label="Search field" type="search" defaultValue="Date" helperText="Search by event date" />
                        <TextField id="outlined-search" label="Search field" type="search" defaultValue="Host" helperText="Search by event host" />
                    </Grid>
                    <Grid container direction={"column"} spacing={1} alignItems={"center"} justifyItems={"center"} marginTop={"2rem"}>
                        {events.map((event: ActivityDatabase) => (
                            <Grid key={event._id}>
                                <Link key={event._id} href={
                                    {
                                        pathname: "/event-detail",
                                        query: {
                                            id: event._id,
                                            events: JSON.stringify(events.map(e => e._id)),
                                            from: 'archived',
                                            page: page
                                        },
                                    }
                                }>
                                    <EventCard event={event}/>
                                </Link>
                            </Grid>
                        ))}
                    {!hasReachedLastPage && (
                        <Button onClick={handleLoadMoreEvents} type='button' variant="contained" color="primary" style={{ textTransform: "none", margin: '1em auto' }}>
                            Load more events
                        </Button>
                    )}
                    </Grid>
                </Container>
            );
        } else {
        return (
            <Grid container direction={"column"} sx={{ backgroundColor: (theme) => theme.palette.background.default, margin: "2rem", }}> 
                <Typography variant="h4" sx={{ padding: "2rem" }} alignSelf={"center"} display={"flex"}>Archived Events</Typography>
                <Grid container gap={4} alignSelf={"center"}>
                    <TextField id="outlined-search" label="Search field" type="search" defaultValue="Event Name" helperText="Search by event name" />
                    <TextField id="outlined-search" label="Search field" type="search" defaultValue="Date" helperText="Search by event date" />
                    <TextField id="outlined-search" label="Search field" type="search" defaultValue="Host" helperText="Search by event host" />
                </Grid>
                <Grid container sx={{ padding: "2rem" }} display={"flex"}>
                </Grid>
                <Grid container sx={{ padding: "2rem" }} display={"flex"}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: isDarkMode ? '#333' : 'inherit' }}>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: isDarkMode ? '#333' : 'inherit', color: isDarkMode ? 'white' : 'inherit', fontWeight: 'bold' }}>Event Title</TableCell>
                                    <TableCell sx={{ backgroundColor: isDarkMode ? '#333' : 'inherit', color: isDarkMode ? 'white' : 'inherit', fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell sx={{ backgroundColor: isDarkMode ? '#333' : 'inherit', color: isDarkMode ? 'white' : 'inherit', fontWeight: 'bold' }}>Location</TableCell>
                                    <TableCell sx={{ backgroundColor: isDarkMode ? '#333' : 'inherit', color: isDarkMode ? 'white' : 'inherit', fontWeight: 'bold' }}>Host Email</TableCell>
                                    <TableCell align="right" sx={{ backgroundColor: isDarkMode ? '#333' : 'inherit' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events.map((nscEvent) => (
                                    <TableRow key={nscEvent.eventTitle}>
                                        <TableCell>
                                        </TableCell>
                                        <TableCell component="th" scope="row">{nscEvent.eventTitle}</TableCell>
                                        <TableCell>{nscEvent.eventDate}</TableCell>
                                        <TableCell>{nscEvent.eventLocation}</TableCell>
                                        <TableCell>{nscEvent.eventMeetingURL}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-controls={open ? 'long-menu' : undefined}
                                                aria-expanded={open ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={handleClick}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="long-menu"
                                                slots={{
                                                    list: { 'aria-labelledby': 'long-button' } as any,
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                slotProps={{
                                                    paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: '20ch', }, }, }}
                                            >
                                                {options.map((option) => (
                                                    <MenuItem key={option} selected={option === 'place'} onClick={handleClose}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Stack alignSelf={"center"}>
                    <Pagination
                        color="primary"
                        page={page}
                        onChange={handleChange}
                        count={10}
                        showFirstButton
                        showLastButton
                        variant="outlined"
                        shape="rounded"
                        size="large"
                        sx={{ padding: "2rem" }}/>
                </Stack>
            </Grid>
        );
    }
    } else {
        return <UnauthorizedPageMessage />;
    }
}

export default ArchivedEvents;


