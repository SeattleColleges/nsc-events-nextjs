"use client";
import TagSelector from "@/components/TagSelector";
import activityAutofill from "@/models/activityAutofill";
import Datepicker from "react-datepicker";
import { useEventForm } from "@/hooks/useEventForm";
import ImagePicker from "@/components/ImagePicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
//import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
//import TextField, { TextFieldProps } from '@mui/material/TextField';
// import { format, parse } from 'date-fns';
import InputField from "@/components/InputFields";
import { TextField, Box, Button, Typography, Stack }  from '@mui/material';


const CreateEvent: React.FC = () => {
  const {
    eventData,
    handleInputChange,
    handleSocialMediaChange,
    handleTagClick,
    handleSubmit,
    errors,
    selectedDate,
    setSelectedDate,
    startTime,
    handleStartTimeChange,
    endTime,
    handleEndTimeChange,
    timeError
  } = useEventForm(activityAutofill);

    // // Convert startTime and endTime from string to Date for TimePicker
    // const startTimeDate = startTime ? parse(startTime, 'HH:mm', new Date()) : null;
    // const endTimeDate = endTime ? parse(endTime, 'HH:mm', new Date()) : null;
  
    // // Handlers for TimePicker changes, converting Date back to string
    // const onStartTimeChange = (date: Date | null) => {
    //   const timeStr = date ? format(date, 'HH:mm') : '';
    //   handleStartTimeChange(timeStr);
    // };
  
    // const onEndTimeChange = (date: Date | null) => {
    //   const timeStr = date ? format(date, 'HH:mm') : '';
    //   handleEndTimeChange(timeStr);
    // };

  return (
   //<LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
            Add Event
        </Typography>
        <Stack spacing={2}> 
          <TextField
            id="event-title"
            label="Event Title"
            variant="outlined"
            name="eventTitle"
            value={eventData.eventTitle}
            onChange={handleInputChange}
            error={!!errors.eventTitle}
            helperText={errors.eventTitle}
          />
          <TextField
            id="event-description"
            label="Event Description"
            variant="outlined"
            name="eventDescription"
            value={eventData.eventDescription}
            onChange={handleInputChange}
            error={!!errors.eventDescription}
            helperText={errors.eventDescription}
          />
          <TextField
            id="event-category"
            label="Event Category"
            variant="outlined"
            name="eventCategory"
            value={eventData.eventCategory}
            onChange={handleInputChange}
            error={!!errors.eventCategory}
            helperText={errors.eventCategory} 
          />
          <div className="mt-1">
            <label className="block text-sm font-medium text-white-700">
              Event Date
            </label>
            <Datepicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat={"MM-dd-yyyy"}
              placeholderText="Select Date"
            />
          </div>

          <InputField
            label="Start Time"
            type="time"
            name="startTime"
            value={startTime || ""}
            onChange={(time) => handleStartTimeChange(time.target.value)}
          />
          <InputField
            label="End Time"
            type="time"
            name="endTime"
            value={endTime || ""}
            onChange={(time) => handleEndTimeChange(time.target.value)}
          />

          {/* <TimePicker
            label="Start Time"
            value={startTimeDate}
            onChange={onStartTimeChange}
            renderInput={(params: TextFieldProps) => <TextField {...params} error={!!timeError} helperText={timeError} />}
          />
          <TimePicker
            label="End Time"
            value={endTimeDate}
            onChange={onEndTimeChange}
            renderInput={(params: TextFieldProps) => <TextField {...params} error={!!timeError} helperText={timeError} />}
          /> */}
          {/* Time Error Message */}
          {timeError && (
            <div className="text-red-500 text-sm mt-2">{timeError}</div>
          )}
          <TagSelector
            selectedTags={eventData.eventTags}
            allTags={[
              "Professional Development",
              "Social",
              "Tech",
              "Conference",
              "Networking",
              "Pizza",
              "LGBTQIA",
            ]}
            onTagClick={handleTagClick}
          />
          <TextField
            id="event-location"
            label="Event Location"
            variant="outlined"
            name="eventLocation"
            value={eventData.eventLocation}
            onChange={handleInputChange}
            error={!!errors.eventLocation}
            helperText={errors.eventLocation}
          />
          <label>
            Event Cover Photo
          <ImagePicker/>
          </label>
          <TextField
            id="event-host"
            label="Event Host"
            variant="outlined"
            name="eventHost"
            value={eventData.eventHost}
            onChange={handleInputChange}
            error={!!errors.eventHost}
            helperText={errors.eventHost} 
          />
          <TextField
            id="event-website"
            label="Event Website"
            variant="outlined"
            name="eventWebsite"
            value={eventData.eventWebsite}
            onChange={handleInputChange}
            error={!!errors.eventWebsite}
            helperText={errors.eventWebsite} 
          />
          <TextField
            id="event-registration"
            label="Event Registration"
            variant="outlined"
            name="eventRegistration"
            value={eventData.eventRegistration}
            onChange={handleInputChange}
            error={!!errors.eventRegistration}
            helperText={errors.eventRegistration}
          />
          <TextField
            id="event-capacity"
            label="Event Capacity"
            variant="outlined"
            name="eventCapacity"
            value={eventData.eventCapacity}
            onChange={handleInputChange}
            error={!!errors.eventCapacity}
            helperText={errors.eventCapacity}
          />
          <TextField
            id="event-cost"
            label="Event Cost"
            variant="outlined"
            name="eventCost"
            value={eventData.eventCost}
            onChange={handleInputChange}
            error={!!errors.eventCost}
            helperText={errors.eventCost}
          />
          <TextField
            id="event-schedule"
            label="Event Schedule"
            variant="outlined"
            name="eventSchedule"
            value={eventData.eventSchedule}
            onChange={handleInputChange}
            error={!!errors.eventSchedule}
            helperText={errors.eventSchedule}
          />
          <TextField
            id="event-speakers"
            label="Event Speakers"
            variant="outlined"
            name="eventSpeakers"
            value={eventData.eventSpeakers}
            onChange={handleInputChange}
            error={!!errors.eventSpeakers}
            helperText={errors.eventSpeakers}
          />
          <TextField
            id="event-prerequisites"
            label="Event Prerequisites"
            variant="outlined"
            name="eventPrerequisites"
            value={eventData.eventPrerequisites}
            onChange={handleInputChange}
            error={!!errors.eventPrerequisites}
            helperText={errors.eventPrerequisites}                 
          />
          <TextField
            id="event-cancellation-policy"
            label="Event CancellationPolicy"
            variant="outlined"
            name="eventCancellationPolicy"
            value={eventData.eventCancellationPolicy}
            onChange={handleInputChange}
            error={!!errors.eventCancellationPolicy}
            helperText={errors.eventCancellationPolicy}
          />
          <TextField
            id="event-contact"
            label="Event Contact"
            variant="outlined"
            name="eventContact"
            value={eventData.eventContact}
            onChange={handleInputChange}
            error={!!errors.eventContact}
            helperText={errors.eventContact}         
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
          />
          <TextField
            id="event-privacy"
            label="Event Privacy"
            variant="outlined"
            name="eventPrivacy"
            value={eventData.eventPrivacy}
            onChange={handleInputChange}
            error={!!errors.eventPrivacy}
            helperText={errors.eventPrivacy}
          />
          <TextField
            id="event-accessibility"
            label="Event Accessibility"
            variant="outlined"
            name="eventAccessibility"
            value={eventData.eventAccessibility}
            onChange={handleInputChange}
            error={!!errors.eventAccessibility}
            helperText={errors.eventAccessibility}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button type="submit" variant="contained" color="primary">
              Create Event
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
        </Stack> 
      </Box>  
   // </LocalizationProvider>  
  );
};

export default CreateEvent;
