import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Box, Button, Checkbox, DialogContentText, Divider, FormControlLabel, Tooltip, Typography } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface AttendDialogProps {
    isOpen: boolean,
    eventId: string,
    dialogToggle: () => void;
}

const AttendDialog = ( { isOpen, eventId, dialogToggle }: AttendDialogProps) => {
    const router = useRouter();
    const [checked, setChecked] = useState(false)
    const [snackbarMessage, setSnackbarMessage ] = useState('')

    const toggleCheckBox = () => {
        setChecked(!checked);
    }

    const handleDialogBtnClick = () => {
        dialogToggle();
    }

    const attendEvent = async (id: string) => {
        const token = localStorage.getItem("token");
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }, body: ''

        };

        if(checked) {
            const body = {
                attendee: {
                    firstName: JSON.parse(atob(token!!!.split(".")[1])).firstName,
                    lastName: JSON.parse(atob(token!!!.split(".")[1])).lastName
                }
            }
            options.body = JSON.stringify(body)
            console.log(options)
        }

        try {
            const response = await fetch(`http://localhost:3000/api/events/attend/${id}`, options );
            return response.json();
        } catch (error) {
            console.error('error: ', error)
        }
    }

    const { mutate: attendEventMutation }  = useMutation({
        mutationFn: attendEvent,
        onSuccess: () => {
            setSnackbarMessage("Successfully added your attendance.");
            setTimeout( () => {
                router.push("/");
            }, 1200)

        },
        onError: (error: String) => {
            setSnackbarMessage("Failed to attend event.");
            console.error("Failed to attend: ", error)
        }
    })

    return (
        <>
            <Dialog
                open={ isOpen }
            >

                <DialogTitle>
                    {"Attend Event?"}
                </DialogTitle>
                <DialogContent dividers sx={ { height: "fit-content" } }>
                    <DialogContentText id="alert-dialog-description">
                        Confirm your attendance.
                    </DialogContentText>

                    <Box sx={ { display: "flex", width: "100%", marginTop: "50px" }}>
                        <FormControlLabel control={    <Checkbox
                            checked={checked}
                            onChange={toggleCheckBox}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />} label="Add my name" />
                        <Tooltip title= {
                            <>
                                <Typography variant={"h3"} sx={ { fontWeight: "bold", fontSize: "20px" }}> Consent Information</Typography>
                                <Typography variant={"body2"}>If you add your name to this event, this information will be public. If you have concerns about this, please deselect.</Typography>
                            </>
                        } placement={"right-start"}>
                            <IconButton sx={ { height: "10px", width: "10px" }}>
                                <InfoIcon sx={ { height: "20px", width: "20px" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </DialogContent>
                <Box sx = { { display: "flex", justifyContent: "space-between" } }>
                <DialogActions  sx={ { marginRight: "20px" } }>
                    <Button onClick={ () =>
                    {
                        handleDialogBtnClick()
                    } }>Cancel</Button>
                    <Divider/>
                    <Box>
                    <Button onClick={() => {
                        attendEventMutation(eventId)
                        handleDialogBtnClick()
                    }} autoFocus>
                        Confirm
                    </Button>
                    </Box>
                </DialogActions>
                </Box>
            </Dialog>
            <Snackbar
                open={
                Boolean(snackbarMessage)
            }
                onClose={() => {
                    setSnackbarMessage("")
                }}
                autoHideDuration={1200}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                message={snackbarMessage}
            />
        </>
    )
}

export default AttendDialog;