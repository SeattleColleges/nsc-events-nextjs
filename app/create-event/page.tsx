"use client";
import TagSelector from "@/components/TagSelector";
import activityAutofill from "@/models/activityAutofill";
import Datepicker from "react-datepicker";
import { useEventForm } from "@/hooks/useEventForm";
import ImagePicker from "@/components/ImagePicker";
import InputField from "@/components/InputFields";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Activity } from "@/models/activity";

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

  return (
    <div className="ml-4">
      <form onSubmit={handleSubmit} className="space-y-4 mr-4">
        <div>
          <h2 className="text-lg font-bold mt-4">Add Event</h2>
          <div className="space-y-2">
            <InputField
              label="Event Title"
              type="text"
              name="eventTitle"
              value={eventData.eventTitle}
              onChange={handleInputChange}
              error={errors.eventTitle}
            />
            <InputField
              label="Event Description"
              type="text"
              name="eventDescription"
              value={eventData.eventDescription}
              onChange={handleInputChange}
              error={errors.eventDescription}
            />
            <InputField
              label="Event Category"
              type="text"
              name="eventCategory"
              value={eventData.eventCategory}
              onChange={handleInputChange}
              error={errors.eventCategory}
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
                className="form-input mt-1 block w-full text-black"
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
            <InputField
              label="Event Location"
              type="text"
              name="eventLocation"
              value={eventData.eventLocation}
              onChange={handleInputChange}
              error={errors.eventLocation}
            />
            <label>
              Event Cover Photo
              <ImagePicker/>
            </label>
            <InputField
              label="Event Host"
              type="text"
              name="eventHost"
              value={eventData.eventHost}
              onChange={handleInputChange}
              error={errors.eventHost}
            />
            <InputField
              label="Event Website"
              type="text"
              name="eventWebsite"
              value={eventData.eventWebsite}
              onChange={handleInputChange}
              error={errors.eventWebsite}
            />
            <InputField
              label="Event Registration"
              type="text"
              name="eventRegistration"
              value={eventData.eventRegistration}
              onChange={handleInputChange}
              error={errors.eventRegistration}
            />
            <InputField
              label="Event Capacity"
              type="text"
              name="eventCapacity"
              value={eventData.eventCapacity}
              onChange={handleInputChange}
              error={errors.eventCapacity}
            />
            <InputField
              label="Event Cost"
              type="text"
              name="eventCost"
              value={eventData.eventCost}
              onChange={handleInputChange}
              error={errors.eventCost}
            />
            <InputField
              label="Event Schedule"
              type="text"
              name="eventSchedule"
              value={eventData.eventSchedule}
              onChange={handleInputChange}
              error={errors.eventSchedule}
            />
            <InputField
              label="Event Speakers"
              type="text"
              name="eventSpeakers"
              value={eventData.eventSpeakers}
              onChange={handleInputChange}
              error={errors.eventSpeakers}
            />
            <InputField
              label="Event Prerequisites"
              type="text"
              name="eventPrerequisites"
              value={eventData.eventPrerequisites}
              onChange={handleInputChange}
              error={errors.eventPrerequisites}
            />
            <InputField
              label="Event CancellationPolicy"
              type="text"
              name="eventCancellationPolicy"
              value={eventData.eventCancellationPolicy}
              onChange={handleInputChange}
              error={errors.eventCancellationPolicy}
            />
            <InputField
              label="Event Contact"
              type="text"
              name="eventContact"
              value={eventData.eventContact}
              onChange={handleInputChange}
              error={errors.eventContact}
            />
            <InputField
              label="Facebook"
              type="text"
              name="facebook"
              value={eventData.eventSocialMedia.facebook || ''}
              onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
              error={errors.eventSocialMedia?.facebook}
            />
            <InputField
              label="Twitter"
              type="text"
              name="twitter"
              value={eventData.eventSocialMedia.twitter || ''}
              onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
              error={errors.eventSocialMedia?.twitter}
            />
            <InputField
              label="Instagram"
              type="text"
              name="instagram"
              value={eventData.eventSocialMedia.instagram || ''}
              onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
              error={errors.eventSocialMedia?.instagram}
            />
            <InputField
              label="Hashtag"
              type="text"
              name="hashtag"
              value={eventData.eventSocialMedia.hashtag || ''}
              onChange={(e) => handleSocialMediaChange('hashtag', e.target.value)}
              error={errors.eventSocialMedia?.hashtag}
            />
            {/* {Object.keys(eventData.eventSocialMedia).map((socialkey) => (
                <InputField
                  key={socialkey}
                  label={socialkey.charAt(0).toUpperCase() + socialkey.slice(1)} 
                  type="text"
                  name={socialkey}
                  value={eventData.eventSocialMedia[socialkey]}
                  onChange={(e) => handleSocialMediaChange(socialkey as keyof Activity['eventSocialMedia'], e.target.value)}
                  error={errors.eventSocialMedia?.[socialkey]}
                />
              ))
            } */}
            <InputField
              label="Event Privacy"
              type="text"
              name="eventPrivacy"
              value={eventData.eventPrivacy}
              onChange={handleInputChange}
              error={errors.eventPrivacy}
            />
            <InputField
              label="Event Accessibility"
              type="text"
              name="eventAccessibility"
              value={eventData.eventAccessibility}
              onChange={handleInputChange}
              error={errors.eventAccessibility}
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
          Create Event
        </button>
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

      </form>
    </div>
  );
};

export default CreateEvent;
