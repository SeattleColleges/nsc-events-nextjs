// frontend/components/ViewAttendeesDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Attendee {
  firstName?: string;
  lastName?: string;
  referralSources?: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  attendees: Attendee[];
}

const ViewAttendeesDialog = ({ open, onClose, attendees }: Props) => {
  const theme = useTheme();
  // on small screens switch to a true fullScreen dialog:
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleExportCSV = () => {
    const headers = ["First Name", "Last Name", "Referral Sources"];
    const rows = attendees.map((a) => [
      a.firstName || "",
      a.lastName || "",
      a.referralSources?.join("; ") || "",
    ]);
    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.map((f) => `"${f}"`).join(","))
        .join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "attendees.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="sm"
      fullScreen={fullScreen}
      fullWidth
    >
      <DialogTitle>Attendees ({attendees.length})</DialogTitle>

      <DialogContent
        dividers
        sx={{
          // only constrain the height on desktop/tablet:
          maxHeight: fullScreen ? "none" : "80vh",
          overflowY: "auto",
          px: fullScreen ? 2 : 3,
          py: fullScreen ? 1 : 2,
        }}
      >
        {attendees.length ? (
          <List disablePadding>
            {attendees.map((att, i) => (
              <ListItem key={i} divider sx={{ py: fullScreen ? 1 : 1.5 }}>
                <Box width="100%">
                  <Typography variant="body1" fontWeight={500}>
                    {att.firstName || att.lastName
                      ? `${att.firstName ?? ""} ${att.lastName ?? ""}`.trim()
                      : "Anonymous"}
                  </Typography>
                  {att.referralSources?.length ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 0.5,
                        wordBreak: "break-word",
                        fontStyle: att.firstName || att.lastName ? "normal" : "italic",
                      }}
                    >
                      Referral: {att.referralSources.join(", ")}
                    </Typography>
                  ) : null}
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No attendees found.</Typography>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: fullScreen ? 2 : 3,
          py: fullScreen ? 1 : 2,
        }}
      >
        <Button
          onClick={handleExportCSV}
          variant="contained"
          size={fullScreen ? "small" : "medium"}
        >
          Export CSV
        </Button>
        <Button onClick={onClose} size={fullScreen ? "small" : "medium"}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewAttendeesDialog;
