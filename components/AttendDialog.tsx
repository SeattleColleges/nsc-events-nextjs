import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Box, Button, Checkbox, DialogContentText, Divider, FormControlLabel, SnackbarContent, Tooltip, Typography } from "@mui/material";
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

const AttendDialog = ({ isOpen, eventId, dialogToggle }: AttendDialogProps) => {
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [heardFrom, setHeardFrom] = useState<string[]>([]); // New state for "Heard From"

    const toggleCheckBox = () => {
        setChecked(!checked);
    };

    // Handle checkbox changes for "Heard From" options
    const handleHeardFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setHeardFrom((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleDialogBtnClick = () => {
        dialogToggle();
    };
    
    const attendEvent = async (id: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Missing token");
        }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;
        const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
      
        const body = {
          userId,
          eventId: id,
          referralSources: heardFrom,
          firstName: checked ? payload.firstName : undefined,
          lastName: checked ? payload.lastName : undefined,
        };
      
        const response = await fetch(`${apiUrl}/event-registration/attend`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
      
        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(errorMsg || "Failed to attend event.");
        }
      
        return response.json();
      };
       
    const { mutate: attendEventMutation } = useMutation({
        mutationFn: attendEvent,
        onSuccess: () => {
            setSnackbarMessage("Successfully added your attendance.");
        },
        onError: (error: String) => {
        setSnackbarMessage("Failed to attend event.");
        console.error("Failed to attend: ", error);
        }
        
    });

    return (
        <>
            <Dialog open={isOpen}>
                <DialogTitle>
                    {"Attend Event?"}
                </DialogTitle>
                <DialogContent dividers sx={{ height: "fit-content" }}>
                    <DialogContentText id="alert-dialog-description">
                        Confirm your attendance.
                    </DialogContentText>

                    {/* Name Checkbox */}
                    <Box sx={{ display: "flex", width: "100%", marginTop: "50px" }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={toggleCheckBox}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label="Add my name"
                        />
                        <Tooltip
                            title={
                                <>
                                    <Typography variant={"h3"} sx={{ fontWeight: "bold", fontSize: "20px" }}>Consent Information</Typography>
                                    <Typography variant={"body2"}>If you add your name to this event, this information will be public. If you have concerns about this, please deselect.</Typography>
                                </>
                            }
                            placement={"right-start"}
                        >
                            <IconButton sx={{ height: "10px", width: "10px" }}>
                                <InfoIcon sx={{ height: "20px", width: "20px" }} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* "Heard From" Checkboxes */}
                    <Box sx={{ marginTop: "30px" }}>
                        <Typography variant="h6">Where did you hear about this event?</Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="Flyer (Grove)"
                                    onChange={handleHeardFromChange}
                                    checked={heardFrom.includes("Flyer (Grove)")}
                                />
                            }
                            label="Flyer (Grove)"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="Flyer (Bulletin Board)"
                                    onChange={handleHeardFromChange}
                                    checked={heardFrom.includes("Flyer (Bulletin Board)")}
                                />
                            }
                            label="Flyer (Bulletin Board)"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="Canvas Announcement"
                                    onChange={handleHeardFromChange}
                                    checked={heardFrom.includes("Canvas Announcement")}
                                />
                            }
                            label="Canvas Announcement"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="Teacher/Staff"
                                    onChange={handleHeardFromChange}
                                    checked={heardFrom.includes("Teacher/Staff")}
                                />
                            }
                            label="Teacher/Staff"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="Student/Friends"
                                    onChange={handleHeardFromChange}
                                    checked={heardFrom.includes("Student/Friends")}
                                />
                            }
                            label="Student/Friends"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="Club Announcement"
                                    onChange={handleHeardFromChange}
                                    checked={heardFrom.includes("Club Announcement")}
                                />
                            }
                            label="Club Announcement"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="Other"
                                    onChange={handleHeardFromChange}
                                    checked={heardFrom.includes("Other")}
                                />
                            }
                            label="Other"
                        />
                    </Box>
                </DialogContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <DialogActions sx={{ marginRight: "20px" }}>
                        <Button onClick={() => {
                            handleDialogBtnClick();
                        }}>Cancel</Button>
                        <Divider />
                        <Box>
                            <Button onClick={() => {
                                attendEventMutation(eventId);
                                handleDialogBtnClick();
                            }} autoFocus>
                                Confirm
                            </Button>
                        </Box>
                    </DialogActions>
                </Box>
            </Dialog>
            <Snackbar
                open={Boolean(snackbarMessage)}
                onClose={() => {
                    setSnackbarMessage("");
                }}
                autoHideDuration={1200}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <SnackbarContent
                    message={snackbarMessage}
                    sx={{ backgroundColor: "white", color: "black" }}
                />
            </Snackbar>
        </>
    );
};

export default AttendDialog;
