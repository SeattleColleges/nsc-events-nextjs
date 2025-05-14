import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, SnackbarContent, Typography } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import Snackbar from "@mui/material/Snackbar";

interface CoverPhotoDialogProps {
    isOpen: boolean
    dialogToggle: () => void;
    eventId: string;
}

function CoverPhotoDialog({ isOpen, dialogToggle, eventId }: CoverPhotoDialogProps) {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const uploadCoverPhoto = async (file: File) => {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("No authentication token found");
        }
        
        const formData = new FormData();
        console.log("File:", file);
        formData.append("coverImage", file);

        let options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            }, 
            body: formData
        };
        
        try {
            const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}/events/${eventId}/cover-image`, options);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const message = errorData.message || "Unknown error occurred";
                throw new Error(message);
            }
            return response.json();
        } catch (error) {
            console.error("Error uploading cover photo:", error);
            throw error;
        }
    }

    const { mutate: uploadCoverPhotoMutation } = useMutation( {
        mutationFn: uploadCoverPhoto,
        onSuccess: (data) => {
            if (data) {
                setSnackbarMessage("Cover photo uploaded successfully!");
            }
        },
        onError: (error) => {
            console.error("Error:", error);
            setSnackbarMessage(`Error: ${error.message}`);
        }
    });
    

  return (
    <>
        <Dialog open={isOpen} onClose={dialogToggle} fullWidth>
            <DialogTitle>
                <Typography variant="h5" component="div">
                    Edit Cover Photo
                </Typography>
            </DialogTitle>
            { selectedImage &&
                <Box 
                    component="img" 
                    src={selectedImage} 
                    alt="cover-photo" 
                    sx={{
                        height: 250,
                        objectFit: "cover",
                        marginBlock: 2,
                        marginLeft: 2,
                        minWidth: 100,
                        maxWidth: 200,

                    }} 
                />
            }
            <DialogContent>
                <Button variant="outlined" component="label"> 
                    <AddPhotoAlternateIcon />
                    <input
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg, image/gif, image/webp" 
                        onChange={
                            (e) => {
                                const file = e.target.files?.[0]; 
                                setSelectedImage(file ? URL.createObjectURL(file) : undefined);
                                setSelectedFile(file);
                            }
                        }
                        hidden
                    />
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                    Click to upload a new cover photo
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={dialogToggle}
                >
                    Close
                </Button>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={
                        () => { 
                                dialogToggle(); 
                                uploadCoverPhotoMutation(selectedFile as File);
                            }
                        } 
                    disabled={!selectedImage}
                > 
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        <Snackbar
            open={Boolean(snackbarMessage)}
            onClose={() => {
                setSnackbarMessage("");
            }}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <SnackbarContent
                message={snackbarMessage}
                sx={{ backgroundColor: "white", color: "black" }}
            />
        </Snackbar>
    </>
  )
}

export default CoverPhotoDialog