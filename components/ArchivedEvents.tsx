'use client';

import useAuth from "@/hooks/useAuth";
import { Checkbox, Grid2, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useArchivedEvents } from "@/utility/queries";
import UnauthorizedPageMessage from "./UnauthorizedPageMessage";
import { ActivityDatabase } from "@/models/activityDatabase";


export function ArchivedEvents() {

    function nscEvent(
        eventTitle: string,
        eventDate: string,
        eventLocation: string,
        eventMeetingURL: string,
    ) {
        return { eventTitle, eventDate, eventLocation, eventMeetingURL };
    }

    const events = [
        nscEvent("name", "date", "location", "host email"),
        nscEvent("name2", "date2", "location2", "host email2"),
        nscEvent("name3", "date3", "location3", "host email3"),
        nscEvent("name4", "date4", "location4", "host email4"),
        nscEvent("name5", "date5", "location5", "host email5"),
        nscEvent("name6", "date6", "location6", "host email6"),
        nscEvent("name7", "date7", "location7", "host email7"),
        nscEvent("name8", "date8", "location8", "host email8"),
        nscEvent("name9", "date9", "location9", "host email9"),
        nscEvent("name10", "date10", "location10", "host email10"),
        nscEvent("name11", "date11", "location11", "host email11"),
        nscEvent("name12", "date12", "location12", "host email12"),
    ]

    const { isAuth, user } = useAuth();
    //const [events, setEvents] = useState<ActivityDatabase[]>([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (
        event: React.ChangeEvent<unknown>, value: number
    ) => {
        setPage(value);
    };

    //const { data } = useArchivedEvents(page, true);

    /* useEffect(() => {
        if (data) {
            setEvents((prevEvents) => [...prevEvents, ...data]);
        }
    }, [data]); */

    if (isAuth && (user?.role === 'admin' || user?.role === 'creator')) {
        return (
            <Grid2 container direction={"column"} bgcolor={"white"} margin={"2rem"}>
                <Typography variant="h4" sx={{ padding: "2rem" }} alignSelf={"center"}>Archived Events</Typography>
                <Grid2 container gap={4} alignSelf={"center"}>
                    <TextField id="outlined-search" label="Search field" type="search" defaultValue="Event Name" helperText="Search by event name" />
                    <TextField id="outlined-search" label="Search field" type="search" defaultValue="Date" helperText="Search by event date" />
                    <TextField id="outlined-search" label="Search field" type="search" defaultValue="Host" helperText="Search by event host" />
                </Grid2>
                <Grid2 sx={{ padding: "2rem" }}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Checkbox color="secondary"></Checkbox>
                                    </TableCell>
                                    <TableCell>Event Title</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Host Email</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events.map((nscEvent) => (
                                    <TableRow key={nscEvent.eventTitle} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>
                                            <Checkbox></Checkbox>
                                        </TableCell>
                                        <TableCell component="th" scope="row">{nscEvent.eventTitle}</TableCell>
                                        <TableCell>{nscEvent.eventDate}</TableCell>
                                        <TableCell>{nscEvent.eventLocation}</TableCell>
                                        <TableCell>{nscEvent.eventMeetingURL}</TableCell>
                                        <TableCell align="right">To do: add menu</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TableFooter>
                            <TablePagination
                                component={"div"}
                                count={100} page={page}
                                onPageChange={handleChangePage} 
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}>
                            </TablePagination>
                        </TableFooter>
                    </TableContainer>
                </Grid2>
                <Stack alignSelf={"center"}>
                    <Pagination 
                    page={page} onChange={handleChange}
                    count={10} variant="outlined" shape="rounded" size="large" sx={{ padding: "2rem" }}/>
                </Stack>
            </Grid2>
        );
    } else {
        return <UnauthorizedPageMessage />;
    }
}

export default ArchivedEvents;
