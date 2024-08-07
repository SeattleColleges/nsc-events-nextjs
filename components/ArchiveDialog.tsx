import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { Button, SnackbarContent } from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import { ActivityDatabase } from "@/models/activityDatabase";

interface ArchiveDialogProps {
  isOpen: boolean;
  event: ActivityDatabase;
  dialogToggle: () => void;
}

const ArchiveDialog = ({ isOpen, event, dialogToggle }: ArchiveDialogProps) => {
  const router = useRouter();
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const archiveEvent = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/events/archive/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to archive event: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error("error: ", error);
      throw error;
    }
  };
  const queryClient = useQueryClient();
  const { mutate: archiveEventMutation } = useMutation({
    mutationFn: archiveEvent,
    onSuccess: async () => {
      setSnackbarMessage("Successfully archived event.");
      await queryClient.refetchQueries({ queryKey: ["events", "myEvents", "archivedEvents"] });
      setTimeout(() => {
        router.refresh();
        router.push("/");
      }, 1200);
    },
    onError: (error: String) => {
      setSnackbarMessage("Failed to archive event.");
      console.error("Failed to archive event: ", error);
    },
  });

  const handleClick = () => {
    dialogToggle();
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>{!event.isArchived ? "Archive Event?" : "Unarchive Event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to {!event.isArchived ? "archive" : "unarchive"} this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClick();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              archiveEventMutation(event._id);
              handleClick();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={Boolean(snackbarMessage)}
        onClose={() => {
          setSnackbarMessage("");
        }}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent message={snackbarMessage} sx={{ backgroundColor: "white", color: "black" }} />
      </Snackbar>
    </>
  );
};

export default ArchiveDialog;
