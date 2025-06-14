import React, { useEffect, useState } from "react";
import { ActivityDatabase } from "@/models/activityDatabase";
import Dialog from "@mui/material/Dialog";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Button, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { textFieldStyle } from "@/components/InputFields";
import TagSelector from "@/components/TagSelector";
import { useEditForm } from "@/hooks/useEditForm";
import { format } from "date-fns";

interface EditDialogProps {
    isOpen: boolean,
    event: ActivityDatabase
    toggleEditDialog: () => void;
}

const EditDialog = ({ isOpen, event, toggleEditDialog }: EditDialogProps) => {
    const {
        handleDateChange,
        onStartTimeChange,
        onEndTimeChange,
        to24HourTime,
        eventData,
        handleInputChange,
        handleSocialMediaChange,
        handleTagClick,
        handleSubmit,
        errors,
        selectedDate,
        timeError,
        successMessage,
        errorMessage,
        startTimeDate,
        endTimeDate,
        to12HourTime,
    } = useEditForm(event);
    
    const [initialEventData, setInitialEventData] = useState(event);    

    useEffect(() => {
        if (isOpen) {
            setInitialEventData(event);
        }
    }, [isOpen, event]);

    const isEventUpdated = () => {
        return JSON.stringify(initialEventData) !== JSON.stringify(eventData) || 
                (selectedDate && selectedDate.toISOString() !== eventData.eventDate) || 
                (startTimeDate && to12HourTime(startTimeDate ? format(startTimeDate, 'HH:mm') : '').toString() !== eventData.eventStartTime) || 
                (endTimeDate && to12HourTime(endTimeDate ? format(endTimeDate, 'HH:mm') : '').toString() !== eventData.eventEndTime);
    };

    return (
        <>
            <Dialog open={ isOpen } maxWidth={"md"} fullWidth={ true }>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ p: 3 }}>
                        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'black', mb: 2 }}>
                            Edit Event
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                id="event-title"
                                label="Event Title"
                                variant="outlined"
                                name="eventTitle"
                                value={eventData.eventTitle || ""}
                                onChange={handleInputChange}
                                error={!!errors.eventTitle}
                                helperText={errors.eventTitle}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the title of the event"
                            />
                            <TextField
                                id="event-description"
                                label="Event Description"
                                multiline
                                maxRows={3}
                                variant="outlined"
                                name="eventDescription"
                                value={eventData.eventDescription || ""}
                                onChange={handleInputChange}
                                error={!!errors.eventDescription}
                                helperText={errors.eventDescription}
                                InputProps={{ style: textFieldStyle.input }}
                                inputProps={{ maxLength: 300 }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the description of the event"
                            />
                            <DatePicker
                                label="Event Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                minDate={new Date()}
                            />
                            <TimePicker
                                label="Start Time"
                                value={startTimeDate}
                                onChange={onStartTimeChange}
                            />
                            <TimePicker
                                label="End Time"
                                value={endTimeDate}
                                onChange={onEndTimeChange}
                            />
                            {/* Time Error Message */}
                            {timeError && (
                                <div className="text-red-500 text-sm mt-2">{timeError}</div>
                            )}
                            <TextField
                                id="event-location"
                                label="Event Location"
                                variant="outlined"
                                name="eventLocation"
                                value={eventData.eventLocation || ""}
                                onChange={handleInputChange}
                                error={!!errors.eventLocation}
                                helperText={errors.eventLocation}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the location of the event"
                            />

                            {/* <label>
            Event Cover Photo
          <ImagePicker />
          </label> */}
                            <TextField
                                id="event-host"
                                label="Event Host"
                                variant="outlined"
                                name="eventHost"
                                value={eventData.eventHost || ""}
                                onChange={handleInputChange}
                                error={!!errors.eventHost}
                                helperText={errors.eventHost}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the host of the event"
                            />
                            <TextField
                                id="event-meeting-url"
                                label="Event Meeting URL"
                                variant="outlined"
                                name="eventMeetingURL"
                                value={eventData.eventMeetingURL || ""}
                                onChange={handleInputChange}
                                error={!!errors.eventMeetingURL}
                                helperText={errors.eventMeetingURL}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                            />
                            <TextField
                                id="event-registration"
                                label="Event Registration"
                                variant="outlined"
                                name="eventRegistration"
                                value={eventData.eventRegistration || ""}
                                onChange={handleInputChange}
                                error={!!errors.eventRegistration}
                                helperText={errors.eventRegistration}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the registration of the event"
                            />
                            <TextField
                                id="event-capacity"
                                label="Event Capacity"
                                variant="outlined"
                                name="eventCapacity"
                                value={eventData.eventCapacity || ""}
                                onChange={handleInputChange}
                                error={!!errors.eventCapacity}
                                helperText={errors.eventCapacity}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the capacity of the event"
                            />
                            <TagSelector
                                selectedTags={eventData.eventTags || []}
                                allTags={[
                                    "Professional Development",
                                    "Club",
                                    "Social",
                                    "Tech",
                                    "Cultural",
                                    "Study",
                                    "Coffee",
                                    "Art/Creative",
                                    "Conference",
                                    "Craft",
                                    "Networking",
                                    "Pizza",
                                    "Free Food",
                                    "LGBTQIA",
                                ]}
                                onTagClick={handleTagClick}
                            />
                            <TextField
                                id="event-schedule"
                                label="Event Schedule"
                                variant="outlined"
                                name="eventSchedule"
                                value={eventData.eventSchedule || ""}
                                onChange={handleInputChange}
                                error={!!errors.eventSchedule}
                                helperText={errors.eventSchedule}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the schedule of the event"
                            />
                            <TextField
                                id="event-speakers"
                                label="Event Speakers"
                                variant="outlined"
                                name="eventSpeakers"
                                value={eventData.eventSpeakers || []}
                                onChange={handleInputChange}
                                error={!!errors.eventSpeakers}
                                helperText={errors.eventSpeakers}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the speaker(s) of the event"
                            />
                            <TextField
                                id="event-prerequisites"
                                label="Event Prerequisites"
                                variant="outlined"
                                name="eventPrerequisites"
                                value={eventData.eventPrerequisites || ''}
                                onChange={handleInputChange}
                                error={!!errors.eventPrerequisites}
                                helperText={errors.eventPrerequisites}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the prerequisites of the event"
                            />
                            <TextField
                                id="event-cancellation-policy"
                                label="Event Cancellation Policy"
                                variant="outlined"
                                name="eventCancellationPolicy"
                                value={eventData.eventCancellationPolicy || ''}
                                onChange={handleInputChange}
                                error={!!errors.eventCancellationPolicy}
                                helperText={errors.eventCancellationPolicy}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the cancellation policy of the event"
                            />
                            <TextField
                                id="event-contact"
                                label="Event Contact"
                                variant="outlined"
                                name="eventContact"
                                value={eventData.eventContact || ''}
                                onChange={handleInputChange}
                                error={!!errors.eventContact}
                                helperText={errors.eventContact}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the contact of the event"
                            />
                            <TextField
                                id="facebook"
                                label="Facebook"
                                variant="outlined"
                                name="facebook"
                                value={eventData.eventSocialMedia.facebook || ''}
                                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                                error={!!errors.eventSocialMedia?.facebook}
                                helperText={errors.eventSocialMedia?.facebook}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the Facebook link of the event"
                            />
                            <TextField
                                id="twitter"
                                label="Twitter"
                                variant="outlined"
                                name="twitter"
                                value={eventData.eventSocialMedia.twitter || ''}
                                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                                error={!!errors.eventSocialMedia?.twitter}
                                helperText={errors.eventSocialMedia?.twitter}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the Twitter link of the event"
                            />
                            <TextField
                                id="instagram"
                                label="Instagram"
                                variant="outlined"
                                name="instagram"
                                value={eventData.eventSocialMedia.instagram || ''}
                                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                                error={!!errors.eventSocialMedia?.instagram}
                                helperText={errors.eventSocialMedia?.instagram}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the Instagram link of the event"
                            />
                            <TextField
                                id="hashtag"
                                label="Hashtag"
                                variant="outlined"
                                name="hashtag"
                                value={eventData.eventSocialMedia.hashtag || ''}
                                onChange={(e) => handleSocialMediaChange('hashtag', e.target.value)}
                                error={!!errors.eventSocialMedia?.hashtag}
                                helperText={errors.eventSocialMedia?.hashtag}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the hashtag of the event"
                            />
                            <TextField
                                id="event-privacy"
                                label="Event Privacy"
                                variant="outlined"
                                name="eventPrivacy"
                                value={eventData.eventPrivacy || ''}
                                onChange={handleInputChange}
                                error={!!errors.eventPrivacy}
                                helperText={errors.eventPrivacy}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the privacy of the event"
                            />
                            <TextField
                                id="event-accessibility"
                                label="Event Accessibility"
                                variant="outlined"
                                name="eventAccessibility"
                                value={eventData.eventAccessibility || ''}
                                onChange={handleInputChange}
                                error={!!errors.eventAccessibility}
                                helperText={errors.eventAccessibility}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                                placeholder="Enter the accessibility of the event"
                            />
                            <TextField
                                id="event-note"
                                label="Event Note"
                                variant="outlined"
                                name="eventNote"
                                value={eventData.eventNote || ''}
                                onChange={handleInputChange}
                                error={!!errors.eventNote}
                                helperText={errors.eventNote}
                                InputProps={{ style: textFieldStyle.input }}
                                InputLabelProps={{ style: textFieldStyle.label }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                                <Box>
                                <Button type="submit" variant="contained" color="primary" style={{ textTransform: "none" }} disabled={!isEventUpdated()}>
                                    Confirm Edit
                                </Button>
                                <div className="error-messages">
                                    {Object.entries(errors).map(([key, value]) => {
                                        if (typeof value === 'object' && value !== null) {
                                            return Object.entries(value).map(([nestedKey, nestedError]) => (
                                                nestedError ? <p key={`${key}-${nestedKey}`} className="error-text" style={{ color: "red" }}>
                                                    {`${nestedKey}: ${nestedError}`}
                                                </p> : null
                                            ));
                                        } else {
                                            return value ? <p key={key} className="error-text" style={{ color: "red" }}>
                                                {value}
                                            </p> : null;
                                        }
                                    })}
                                </div>
                                </Box>

                                <Button variant="contained" color="primary" sx={{ textTransform: "none", flex: "0 0 auto" }} onClick={ () => {
                                    toggleEditDialog()
                                }}>
                                    Cancel
                                </Button>
                            </Box>


                        </Stack>
                        {/* Success/Error message upon button click */}
                        {successMessage && (
                            <Typography color="green" sx={{ mb: 2 }}>
                                {successMessage}
                            </Typography>
                        )
                        }

                        {errorMessage && (
                            <Typography color="error" sx={{ mb: 2 }}>
                                {errorMessage}
                            </Typography>
                        )
                        }
                    </Box>
                </LocalizationProvider>
            </Dialog>

        </>
    )


}

export default EditDialog;