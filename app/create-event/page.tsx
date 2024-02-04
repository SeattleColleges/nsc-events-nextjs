"use client";
import TagSelector from "@/components/TagSelector";
import activityAutofill from "@/models/activityAutofill";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useEventForm } from "@/hooks/useEventForm";
import ImagePicker from "@/components/ImagePicker";

const CreateEvent: React.FC = () => {
  const {
    eventData,
    handleInputChange,
    handleTagClick,
    handleSubmit,
    errors,
    selectedDate,
    setSelectedDate,
    startTime,
    setStartTime,
    handleStartTimeChange,
    endTime,
    setEndTime,
    handleEndTimeChange,
    timeError,
    setTimeError
  } = useEventForm(activityAutofill);

  return (
    <div className="ml-4">
      <form onSubmit={handleSubmit} className="space-y-4 mr-4">
        <div>
          <h2 className="text-lg font-bold mt-4">Add Event</h2>
          <div className="space-y-2">
            <label>
              Event Title
              <input
                name="eventTitle"
                value={eventData.eventTitle}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventTitle && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventTitle}
                </p>
              )}
            </label>
            <label>
              Event Description
              <input
                name="eventDescription"
                value={eventData.eventDescription}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventDescription && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventDescription}
                </p>
              )}
            </label>
            <label>
              Event Category
              <input
                name="eventCategory"
                value={eventData.eventCategory}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventCategory && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventCategory}
                </p>
              )}
            </label>
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
            <div>
              <label className="block text-sm font-medium text-white-700">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={startTime || ""}
                onChange={(time) => handleStartTimeChange(time.target.value)}
                className="form-input mt-1 block w-full text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={endTime || ""}
                onChange={(time) => handleEndTimeChange(time.target.value)}
                className="form-input mt-1 block w-full text-black"
              />
            </div>
            {/* Time Error Message */}
            {timeError && (
              <div className="text-red-500 text-sm mt-2">{timeError}</div>
            )}
            <label>
              Event Location
              <input
                name="eventLocation"
                value={eventData.eventLocation}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventLocation && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventLocation}
                </p>
              )}
            </label>
            <label>
              Event Cover Photo
              <ImagePicker/>
            </label>
            <label>
              Event Host
              <input
                name="eventHost"
                value={eventData.eventHost}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventHost && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventHost}
                </p>
              )}
            </label>
            <label>
              Event Website
              <input
                name="eventWebsite"
                value={eventData.eventWebsite}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Event Registration
              <input
                name="eventRegistration"
                value={eventData.eventRegistration}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventRegistration && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventRegistration}
                </p>
              )}
            </label>
            <label>
              Event Capacity
              <input
                name="eventCapacity"
                value={eventData.eventCapacity}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventCapacity && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventCapacity}
                </p>
              )}
            </label>
            <label>
              Event Cost
              <input
                name="eventCost"
                value={eventData.eventCost}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
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
            {/* Repeat for other fields in the "General Information" group */}
            <label>
              Event Schedule
              <input
                name="eventSchedule"
                value={eventData.eventSchedule}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventSchedule && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventSchedule}
                </p>
              )}
            </label>
            <label>
              Event Speakers
              <input
                name="eventSpeakers"
                value={eventData.eventSpeakers}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventSpeakers && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventSpeakers}
                </p>
              )}
            </label>
            <label>
              Event Prerequisites
              <input
                name="eventPrerequisites"
                value={eventData.eventPrerequisites}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventPrerequisites && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventPrerequisites}
                </p>
              )}
            </label>
            <label>
              Event Cancellation Policy
              <input
                name="eventCancellationPolicy"
                value={eventData.eventCancellationPolicy}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventCancellationPolicy && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventCancellationPolicy}
                </p>
              )}
            </label>
            <label>
              Event Contact
              <input
                name="eventContact"
                value={eventData.eventContact}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventContact && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventContact}
                </p>
              )}
            </label>
            <label>
              Facebook
              <input
                name="facebook"
                value={eventData.eventSocialMedia.facebook}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Twitter
              <input
                name="twitter"
                value={eventData.eventSocialMedia.twitter}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Instagram
              <input
                name="instagram"
                value={eventData.eventSocialMedia.instagram}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Hashtag
              <input
                name="hashtag"
                value={eventData.eventSocialMedia.hashtag}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Event Privacy
              <input
                name="eventPrivacy"
                value={eventData.eventPrivacy}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label>
              Event Accessibility
              <input
                name="eventAccessibility"
                value={eventData.eventAccessibility}
                onChange={handleInputChange}
                style={{ color: "black" }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.eventAccessibility && (
                <p className="error-text" style={{ color: "red" }}>
                  {errors.eventAccessibility}
                </p>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Create Event
        </button>
        <div className="error-messages">
          {/* rendering accumulated error messages */}
          {Object.entries(errors).map(([key, value]) => (
            <p key={key} className="error-text" style={{ color: "red" }}>
              {value}
            </p>
          ))}
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
