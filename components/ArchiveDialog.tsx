import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button, SnackbarContent } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";

interface ArchiveDialogProps {
    isOpen: boolean;
    eventId: string;
    dialogToggle: () => void;
}

const ArchiveDialog = ({ isOpen, eventId, dialogToggle }: ArchiveDialogProps) => {
    const router = useRouter();
    const  [snackbarMessage, setSnackbarMessage] = useState("")

    const archiveEvent = async (id: string) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:3000/api/events/archive/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.json();
        } catch (error) {
            console.error('error: ', error)
        }
    }

    const { mutate: archiveEventMutation }  = useMutation({
        mutationFn: archiveEvent,
        onSuccess: () => {
            setSnackbarMessage("Successfully archived event.");
            setTimeout( () => {
                router.push("/");
            }, 1200);

        },
        onError: (error: String) => {
            setSnackbarMessage("Failed to archive event.");
            console.error("Failed to archive event: ", error)
        }
    })

    const handleClick = () => {
        dialogToggle();
    }

    return (
        <>
            <Dialog
                open={isOpen}>
                <DialogTitle>
                    {"Archive Event?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to archive this event?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => {
                        handleClick()
                    } }>Cancel</Button>
                    <Button onClick={() => {
                        archiveEventMutation(eventId)
                        handleClick()
                    }} autoFocus>
                        Archive
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={Boolean(snackbarMessage)}
                onClose={() => {
                    setSnackbarMessage("")
                }}
                autoHideDuration={1200}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <SnackbarContent
                    message={snackbarMessage}
                    sx={{color: 'black'}}
                />
            </Snackbar>
        </>
    )
}
export default ArchiveDialog;
