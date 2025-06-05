"use client";
import TagSelector from "@/components/TagSelector";
import { activity } from "@/models/activity";
import { useEventForm } from "@/hooks/useEventForm";
import ImagePicker from "@/components/ImagePicker";
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { format, parse } from 'date-fns';
import { Box, Button, Typography, Stack, useTheme, useMediaQuery, Paper } from '@mui/material';
import { textFieldStyle } from "@/components/InputFields"
import { MouseEvent, ChangeEvent, useState, FormEvent } from "react";
import useAuth from "@/hooks/useAuth";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import { EventTags } from "@/utility/tags";
import { useThemeContext } from "../theme/providers";


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
    timeError,
    successMessage
  } = useEventForm(activity);


  // Get the current theme mode for current page
  // can use the mode variable for chaning non MUI componenets that goes with light or dark mode
  const { mode, toggleTheme } = useThemeContext() as {
    mode: string;
    toggleTheme: () => void;
  };

  // Convert startTime and endTime from string to Date for TimePicker
  const startTimeDate = startTime ? parse(startTime, 'HH:mm', new Date()) : null;
  const endTimeDate = endTime ? parse(endTime, 'HH:mm', new Date()) : null;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  // Handlers for TimePicker changes, converting Date back to string
  const onStartTimeChange = (date: Date | null) => {
    const timeStr = date ? format(date, 'HH:mm') : '';
    handleStartTimeChange(timeStr);
  };

  const onEndTimeChange = (date: Date | null) => {
    const timeStr = date ? format(date, 'HH:mm') : '';
    handleEndTimeChange(timeStr);
  };

  // For holding useState of event tags and adding custom tags
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const addCustomTag = (e: MouseEvent<HTMLButtonElement>) => {
    const normalizedNewTag = newTag.toLowerCase();
    e.preventDefault();
    if (newTag && !customTags.includes(normalizedNewTag)) {
      setCustomTags([...customTags, normalizedNewTag]);
      setNewTag("");
    }
  };

  const handleNewTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const { isAuth, user } = useAuth();

  if (isAuth && (user?.role === 'admin' || user?.role === 'creator')) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>

        {/* start of the create events form */}
        <Box component="form"
          onSubmit={handleSubmit}
          noValidate autoComplete="off"
          sx={{
            paddingTop: 3,
            width: isMobile ? '100%' : '75%', mx: 'auto'
          }}>

          <Stack spacing={2}>

            {/* page title */}
            <Box sx={{
              backgroundColor: '#114FA2',
              boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
              borderRadius: 1,
            }}>

              <Typography
                fontSize={isMobile ? "1.75rem" : "2.25rem"}
                textAlign={"center"}
                marginTop={"0.5rem"}
                marginBottom={"1rem"}
                sx={{ color: 'white' }}

              >Add Event
              </Typography>
            </Box>

            <Box>
              <Typography
                fontSize={isMobile ? "1rem" : "1rem"}
                textAlign={"center"}
                marginTop={"0.5rem"}
                marginBottom={"1rem"}
                sx={{ color: 'red' }}
              >
                REQUIRED FIELDS*
              </Typography>
            </Box>

            {/* start of row 1 */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              backgroundColor: '#114FA2',
              boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
              width: '100%',
              borderRadius: 1
            }}>


              {/* start of box 1 row 1 */}
              <Box sx={{
                margin: isMobile ? 0 : 4,
                marginTop: isMobile ? 2 : 4,
                width: isMobile ? '100%' : '33%',
                backgroundColor: mode === 'light' ? 'white' : 'black',
                boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
                borderRadius: 1
              }}>

                {/* stack tag for vertical alignment of text fields */}
                <Stack
                  sx={{ width: '100%', padding: 5 }}
                  spacing={2}
                >

                  <TextField
                    id="event-title"
                    label="Event Title *"
                    variant="outlined"
                    name="eventTitle"
                    value={eventData.eventTitle}
                    onChange={handleInputChange}
                    error={!!errors.eventTitle}
                    helperText={errors.eventTitle}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the title of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-host"
                    label="Event Host *"
                    variant="outlined"
                    name="eventHost"
                    value={eventData.eventHost}
                    onChange={handleInputChange}
                    error={!!errors.eventHost}
                    helperText={errors.eventHost}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the host of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-registration"
                    label="Event Registration"
                    variant="outlined"
                    name="eventRegistration"
                    value={eventData.eventRegistration}
                    onChange={handleInputChange}
                    // error={!!errors.eventRegistration} lifted requirements 
                    // helperText={errors.eventRegistration}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the registration of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-description"
                    label="Event Description *"
                    multiline
                    maxRows={3}
                    variant="outlined"
                    name="eventDescription"
                    value={eventData.eventDescription}
                    onChange={handleInputChange}
                    error={!!errors.eventDescription}
                    helperText={errors.eventDescription}
                    InputProps={{ style: textFieldStyle.input }}
                    inputProps={{ maxLength: 300 }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the description of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />
                </Stack>
              </Box> {/* end of box 1 */}

              {/* Decision to get rid of event category but comment out just incase for future use */}
              {/* <TextField
                id="event-category"
                label="Event Category"
                variant="outlined"
                name="eventCategory"
                value={eventData.eventCategory}
                onChange={handleInputChange}
                error={!!errors.eventCategory}
                helperText={errors.eventCategory}
                InputProps={{ style: textFieldStyle.input }}
                InputLabelProps={{ style: textFieldStyle.label }} 
                placeholder="Enter the category of the event"
              /> */}

              {/* start of box 2 row 1 */}
              <Box sx={{
                margin: isMobile ? 0 : 4,
                marginTop: isMobile ? 2 : 4,
                width: isMobile ? '100%' : '33%',
                backgroundColor: mode === 'light' ? 'white' : 'black',
                boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
                borderRadius: 1
              }}>

                {/* stack tag for vertical alignment */}
                <Stack
                  sx={{ width: '100%', padding: 5 }}
                  spacing={2}
                >

                  <DatePicker
                    label="Event Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />
                  <TimePicker
                    label="Start Time"
                    value={startTimeDate}
                    onChange={onStartTimeChange}
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />
                  <TimePicker
                    label="End Time"
                    value={endTimeDate}
                    onChange={onEndTimeChange}
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />
                  {/* Time Error Message */}
                  {timeError && (
                    <div className="text-red-500 text-sm mt-2">{timeError}</div>
                  )}

                </Stack>
              </Box> {/* end of box 2 row 1 */}

              {/* <label>
            Event Cover Photo
          <ImagePicker />
          </label> */}

              {/* start of box 3 row 1 */}
              <Box sx={{
                margin: isMobile ? 0 : 4,
                marginTop: isMobile ? 2 : 4,
                width: isMobile ? '100%' : '33%',
                backgroundColor: mode === 'light' ? 'white' : 'black',
                boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
                borderRadius: 1
              }}>

                {/* stack tag for vertical alignment */}
                <Stack
                  sx={{ width: '100%', padding: 5 }}
                  spacing={2}
                >

                  {/* commented out below due to not needing the cover photo and document fields. */}
                  {/* <TextField
                    id="event-cover-photo"
                    label="Event Cover Photo"
                    variant="outlined"
                    name="eventCoverPhoto"
                    value={eventData.eventCoverPhoto}
                    onChange={handleInputChange}
                    // error={!!errors.eventCoverPhoto}
                    helperText={errors.eventCoverPhoto}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the event cover photo of the event"
                  />

                  <TextField
                    id="event-document"
                    label="Event Document"
                    variant="outlined"
                    name="eventDocument"
                    value={eventData.eventDocument}
                    onChange={handleInputChange}
                    // error={!!errors.eventDocument}
                    helperText={errors.eventDocument}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Add a document for the event"
                  /> */}

                  <TextField
                    id="event-capacity"
                    label="Event Capacity *"
                    variant="outlined"
                    name="eventCapacity"
                    value={eventData.eventCapacity}
                    onChange={handleInputChange}
                    error={!!errors.eventCapacity}
                    helperText={errors.eventCapacity}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the capacity of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />


                  <TextField
                    id="event-meeting-url"
                    label="Event Meeting URL"
                    variant="outlined"
                    name="eventMeetingURL"
                    value={eventData.eventMeetingURL}
                    onChange={handleInputChange}
                    // error={!!errors.eventMeetingURL}
                    // helperText={errors.eventMeetingURL}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-location"
                    label="Event Location *"
                    variant="outlined"
                    name="eventLocation"
                    value={eventData.eventLocation}
                    onChange={handleInputChange}
                    error={!!errors.eventLocation}
                    helperText={errors.eventLocation}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the location of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                </Stack>
              </Box> {/* End of box 3 row 1*/}

            </Box> {/* End of row 1*/}

            {/* Begining of tag selector section */}
            <Box sx={{
              backgroundColor: '#42A5F5',
              padding: 2,
              boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
              borderRadius: 1
            }}>

              <TagSelector
                selectedTags={eventData.eventTags}
                allTags={[
                  ...EventTags,
                  ...customTags
                ]}
                onTagClick={handleTagClick}
              />

              <Box sx={{ backgroundColor: 'none', padding: 2 }}>

                <TextField
                  id="add-custom-tag"
                  label="Add Tag *"
                  variant="outlined"
                  name="addedTag"
                  value={newTag}
                  onChange={handleNewTagChange}
                  // Need to figure out what can go in the following values, 
                  // I commented out from other text-fields
                  error={!!errors.eventTags}
                  helperText={errors.eventTags}
                  InputProps={{ style: textFieldStyle.input }}
                  InputLabelProps={{ style: textFieldStyle.label }}
                  placeholder="Enter the tag of the event"
                  sx={{
                    backgroundColor: mode === 'light' ? 'white' : 'black', borderRadius: 1 }} // change border radius as needed
                />

                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={addCustomTag}
                  style={{ textTransform: "none", margin: 10 }}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#114FA2',
                      color: 'white'
                    },
                    } }
                >
                  Add Tag
                </Button>
              </Box>
            </Box>
            {/* end of tag selection section */}

            {/* Start of row 2 */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              backgroundColor: '#114FA2',
              boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
              borderRadius: 1,
            }}>

              {/* start of seciton 1 row 2 */}
              <Box sx={{
                margin: isMobile ? 0 : 4,
                marginTop: isMobile ? 2 : 4,
                width: isMobile ? '100%' : '33%',
                backgroundColor: mode === 'light' ? 'white' : 'black',
                boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
                borderRadius: 1
              }}>

                <Stack
                  sx={{ width: '100%', padding: 5 }}
                  spacing={2}
                >

                  <TextField
                    id="event-schedule"
                    label="Event Schedule"
                    variant="outlined"
                    name="eventSchedule"
                    value={eventData.eventSchedule}
                    onChange={handleInputChange}
                    // error={!!errors.eventSchedule}
                    // helperText={errors.eventSchedule}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the schedule of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-speakers"
                    label="Event Speakers"
                    variant="outlined"
                    name="eventSpeakers"
                    value={eventData.eventSpeakers}
                    onChange={handleInputChange}
                    // error={!!errors.eventSpeakers}
                    // helperText={errors.eventSpeakers}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the speaker(s) of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-prerequisites"
                    label="Event Prerequisites"
                    variant="outlined"
                    name="eventPrerequisites"
                    value={eventData.eventPrerequisites}
                    onChange={handleInputChange}
                    // error={!!errors.eventPrerequisites}
                    // helperText={errors.eventPrerequisites}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the prerequisites of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-cancellation-policy"
                    label="Event Cancellation Policy"
                    variant="outlined"
                    name="eventCancellationPolicy"
                    value={eventData.eventCancellationPolicy}
                    onChange={handleInputChange}
                    // error={!!errors.eventCancellationPolicy}
                    // helperText={errors.eventCancellationPolicy}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the cancellation policy of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />
                </Stack>
              </Box>  {/* END of box 2 of row 2 */}

              {/* start of box 2 of row 2 */}
              <Box sx={{
                margin: isMobile ? 0 : 4,
                marginTop: isMobile ? 2 : 4,
                width: isMobile ? '100%' : '33%',
                backgroundColor: mode === 'light' ? 'white' : 'black',
                boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
                borderRadius: 1
              }}>

                <Stack
                  sx={{ width: '100%', padding: 5 }}
                  spacing={2}
                >

                  <TextField
                    id="event-contact"
                    label="Event Contact *"
                    variant="outlined"
                    name="eventContact"
                    value={eventData.eventContact}
                    onChange={handleInputChange}
                    error={!!errors.eventContact}
                    helperText={errors.eventContact}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the contact of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="facebook"
                    label="Facebook"
                    variant="outlined"
                    name="facebook"
                    value={eventData.eventSocialMedia.facebook || ''}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                    // error={!!errors.eventSocialMedia?.facebook}
                    // helperText={errors.eventSocialMedia?.facebook}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the Facebook link of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="twitter"
                    label="Twitter"
                    variant="outlined"
                    name="twitter"
                    value={eventData.eventSocialMedia.twitter || ''}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    // error={!!errors.eventSocialMedia?.twitter}
                    // helperText={errors.eventSocialMedia?.twitter}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the Twitter link of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="instagram"
                    label="Instagram"
                    variant="outlined"
                    name="instagram"
                    value={eventData.eventSocialMedia.instagram || ''}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    // error={!!errors.eventSocialMedia?.instagram}
                    // helperText={errors.eventSocialMedia?.instagram}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the Instagram link of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />
                </Stack>
              </Box>

              {/* start of section 3 row 2 */}
              <Box sx={{
                margin: isMobile ? 0 : 4,
                marginTop: isMobile ? 2 : 4,
                width: isMobile ? '100%' : '33%',
                backgroundColor: mode === 'light' ? 'white' : 'black',
                boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.3)',
                borderRadius: 1
              }}>

                <Stack
                  sx={{ width: '100%', padding: 5 }}
                  spacing={2}
                >

                  <TextField
                    id="hashtag"
                    label="Hashtag"
                    variant="outlined"
                    name="hashtag"
                    value={eventData.eventSocialMedia.hashtag || ''}
                    onChange={(e) => handleSocialMediaChange('hashtag', e.target.value)}
                    // error={!!errors.eventSocialMedia?.hashtag}
                    // helperText={errors.eventSocialMedia?.hashtag}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the hashtag of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-privacy"
                    label="Event Privacy"
                    variant="outlined"
                    name="eventPrivacy"
                    value={eventData.eventPrivacy}
                    onChange={handleInputChange}
                    // error={!!errors.eventPrivacy}
                    // helperText={errors.eventPrivacy}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the privacy of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-accessibility"
                    label="Event Accessibility"
                    variant="outlined"
                    name="eventAccessibility"
                    value={eventData.eventAccessibility}
                    onChange={handleInputChange}
                    // error={!!errors.eventAccessibility}
                    // helperText={errors.eventAccessibility}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    placeholder="Enter the accessibility of the event"
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                  <TextField
                    id="event-note"
                    label="Event Note"
                    variant="outlined"
                    name="eventNote"
                    value={eventData.eventNote}
                    onChange={handleInputChange}
                    // error={!!errors.eventNote}
                    // helperText={errors.eventNote}
                    InputProps={{ style: textFieldStyle.input }}
                    InputLabelProps={{ style: textFieldStyle.label }}
                    sx={{ backgroundColor: mode === 'light' ? 'white' : '#f5f1f11a' }}
                  />

                </Stack>
              </Box> {/* END of section 3 row 2 */}
            </Box> {/* END of row 2 */}

            {/* start of submit button */}
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ textTransform: "none" }}
                sx={{ margin: 1,
                  '&:hover': {
                    backgroundColor: '#114FA2',
                      color: 'white'
                   },
                    }}
              >
                Create Event
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
        </Box>
      </LocalizationProvider>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
};

export default CreateEvent;
