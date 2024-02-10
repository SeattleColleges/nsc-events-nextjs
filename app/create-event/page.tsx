"use client";
import TagSelector from "@/components/TagSelector";
import activityAutofill from "@/models/activityAutofill";
import Datepicker from "react-datepicker";
import { useEventForm } from "@/hooks/useEventForm";
import ImagePicker from "@/components/ImagePicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField, { TextFieldProps } from '@mui/material/TextField';
// import { format, parse } from 'date-fns';
import InputField from "@/components/InputFields";


// custom theme
const createEventTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': { color: 'white' },
          '& .MuiInputBase-input': { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
        },
      },
    },
  },
});


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
    <ThemeProvider theme={createEventTheme}>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>
              Add Event
          </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{ '& .MuiFormControl-root': { mb: 2, width: '100%' } }}
            >

              <FormControl variant="outlined" size="small">
                <InputLabel htmlFor="event-title">Event Title</InputLabel>
                  <TextField
                    id="event-title"
                    label="Event Title"
                    variant="outlined"
                    name="eventTitle"
                    value={eventData.eventTitle}
                    onChange={handleInputChange}
                    error={!!errors.eventTitle}
                    helperText={errors.eventTitle}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>
                
              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-description">Event Description</InputLabel>
                  <TextField
                    id="event-description"
                    label="Event Description"
                    variant="outlined"
                    name="eventDescription"
                    value={eventData.eventDescription}
                    onChange={handleInputChange}
                    error={!!errors.eventDescription}
                    helperText={errors.eventDescription}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>
            
              <FormControl variant="outlined" size="small">   
                <InputLabel htmlFor="event-category">Event Category</InputLabel>
                  <TextField
                    id="event-category"
                    label="Event Category"
                    variant="outlined"
                    name="eventCategory"
                    value={eventData.eventCategory}
                    onChange={handleInputChange}
                    error={!!errors.eventCategory}
                    helperText={errors.eventCategory}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

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
              <div className="space-y-2">
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
              </div>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-location">Event Location</InputLabel>
                  <TextField
                    id="event-location"
                    label="Event Location"
                    variant="outlined"
                    name="eventLocation"
                    value={eventData.eventLocation}
                    onChange={handleInputChange}
                    error={!!errors.eventLocation}
                    helperText={errors.eventLocation}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <label>
                Event Cover Photo
                <ImagePicker/>
              </label>
                
              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-host">Event Host</InputLabel>
                  <TextField
                    id="event-host"
                    label="Event Host"
                    variant="outlined"
                    name="eventHost"
                    value={eventData.eventHost}
                    onChange={handleInputChange}
                    error={!!errors.eventHost}
                    helperText={errors.eventHost}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-website">Event Website</InputLabel>
                  <TextField
                    id="event-website"
                    label="Event Website"
                    variant="outlined"
                    name="eventWebsite"
                    value={eventData.eventWebsite}
                    onChange={handleInputChange}
                    error={!!errors.eventWebsite}
                    helperText={errors.eventWebsite}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-registration">Event Registration</InputLabel>
                  <TextField
                    id="event-registration"
                    label="Event Registration"
                    variant="outlined"
                    name="eventRegistration"
                    value={eventData.eventRegistration}
                    onChange={handleInputChange}
                    error={!!errors.eventRegistration}
                    helperText={errors.eventRegistration}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-capacity">Event Capacity</InputLabel>
                  <TextField
                    id="event-capacity"
                    label="Event Capacity"
                    variant="outlined"
                    name="eventCapacity"
                    value={eventData.eventCapacity}
                    onChange={handleInputChange}
                    error={!!errors.eventCapacity}
                    helperText={errors.eventCapacity}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-cost">Event Cost</InputLabel>
                  <TextField
                    id="event-cost"
                    label="Event Cost"
                    variant="outlined"
                    name="eventCost"
                    value={eventData.eventCost}
                    onChange={handleInputChange}
                    error={!!errors.eventCost}
                    helperText={errors.eventCost}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-schedule">Event Schedule</InputLabel>
                  <TextField
                    id="event-schedule"
                    label="Event Schedule"
                    variant="outlined"
                    name="eventSchedule"
                    value={eventData.eventSchedule}
                    onChange={handleInputChange}
                    error={!!errors.eventSchedule}
                    helperText={errors.eventSchedule}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-speakers">Event Speakers</InputLabel>
                  <TextField
                    id="event-speakers"
                    label="Event Speakers"
                    variant="outlined"
                    name="eventSpeakers"
                    value={eventData.eventSpeakers}
                    onChange={handleInputChange}
                    error={!!errors.eventSpeakers}
                    helperText={errors.eventSpeakers}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-prerequisites">Event Prerequisites</InputLabel>
                  <TextField
                    id="event-prerequisites"
                    label="Event Prerequisites"
                    variant="outlined"
                    name="eventPrerequisites"
                    value={eventData.eventPrerequisites}
                    onChange={handleInputChange}
                    error={!!errors.eventPrerequisites}
                    helperText={errors.eventPrerequisites}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-cancellation-policy">Event Cancellation Policy</InputLabel>
                  <TextField
                    id="event-cancellation-policy"
                    label="Event CancellationPolicy"
                    variant="outlined"
                    name="eventCancellationPolicy"
                    value={eventData.eventCancellationPolicy}
                    onChange={handleInputChange}
                    error={!!errors.eventCancellationPolicy}
                    helperText={errors.eventCancellationPolicy}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-contact">Event Contact</InputLabel>
                  <TextField
                    id="event-contact"
                    label="Event Contact"
                    variant="outlined"
                    name="eventContact"
                    value={eventData.eventContact}
                    onChange={handleInputChange}
                    error={!!errors.eventContact}
                    helperText={errors.eventContact}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="facebook">Facebook</InputLabel>
                  <TextField
                    id="facebook"
                    label="Facebook"
                    variant="outlined"
                    name="facebook"
                    value={eventData.eventSocialMedia.facebook || ''}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                    error={!!errors.eventSocialMedia?.facebook}
                    helperText={errors.eventSocialMedia?.facebook}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="twitter">Twitter</InputLabel>
                  <TextField
                    id="twitter"
                    label="Twitter"
                    variant="outlined"
                    name="twitter"
                    value={eventData.eventSocialMedia.twitter || ''}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    error={!!errors.eventSocialMedia?.twitter}
                    helperText={errors.eventSocialMedia?.twitter}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="instagram">Instagram</InputLabel>
                  <TextField
                    id="instagram"
                    label="Instagram"
                    variant="outlined"
                    name="instagram"
                    value={eventData.eventSocialMedia.instagram || ''}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    error={!!errors.eventSocialMedia?.instagram}
                    helperText={errors.eventSocialMedia?.instagram}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="hashtag">Hashtag</InputLabel>
                  <TextField
                    id="hashtag"
                    label="Hashtag"
                    variant="outlined"
                    name="hashtag"
                    value={eventData.eventSocialMedia.hashtag || ''}
                    onChange={(e) => handleSocialMediaChange('hashtag', e.target.value)}
                    error={!!errors.eventSocialMedia?.hashtag}
                    helperText={errors.eventSocialMedia?.hashtag}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>
                
              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-privacy">Event Privacy</InputLabel>
                  <TextField
                    id="event-privacy"
                    label="Event Privacy"
                    variant="outlined"
                    name="eventPrivacy"
                    value={eventData.eventPrivacy}
                    onChange={handleInputChange}
                    error={!!errors.eventPrivacy}
                    helperText={errors.eventPrivacy}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

              <FormControl variant="outlined" size="small"> 
                <InputLabel htmlFor="event-accessibility">Event Accessibility</InputLabel>
                  <TextField
                    id="event-accessibility"
                    label="Event Accessibility"
                    variant="outlined"
                    name="eventAccessibility"
                    value={eventData.eventAccessibility}
                    onChange={handleInputChange}
                    error={!!errors.eventAccessibility}
                    helperText={errors.eventAccessibility}
                    sx={{
                      '& .MuiInputLabel-outlined': {
                        transform: 'translate(14px, 14px) scale(1)', // Adjust label position
                        '&.MuiInputLabel-shrink': {
                          transform: 'translate(14px, -6px) scale(0.75)', // Adjust label position when focused
                        },
                      },
                    }}
                  />
              </FormControl>

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
        </Box>
      {/* </LocalizationProvider> */}
    </ThemeProvider>
  );
};

export default CreateEvent;
