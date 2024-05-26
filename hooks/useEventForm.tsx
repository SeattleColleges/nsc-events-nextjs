import { ChangeEventHandler, FormEvent, useState } from "react";
import { validateFormData } from "@/utility/validateFormData";
import { Activity, FormErrors } from "@/models/activity";
import useDateTimeSelection from "./useDateTimeSelection";
import { ActivityDatabase } from "@/models/activityDatabase";
import { useQueryClient } from "@tanstack/react-query";

export const useEventForm = (initialData: Activity | ActivityDatabase) => {

  const [eventData, setEventData] = useState<Activity | ActivityDatabase>(initialData);
  const [errors, setErrors] = useState<FormErrors>({
    eventTitle: "",
    eventDescription: "",
    eventCategory: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventLocation: "",
    eventMeetingUrl: "",
    eventCoverPhoto: "",
    eventHost: "",
    eventRegistration: "",
    eventTags: "",
    eventSchedule: "",
    eventSpeakers: "",
    eventPrerequisites: "",
    eventCancellationPolicy: "",
    eventContact: "",
    eventSocialMedia: {
        facebook: "",
        twitter: "",
        instagram: "",
        hashtag: ""
    },
    eventPrivacy: "",
    eventAccessibility: ""
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // success/error messages for event creation
  const [successMessage, setSuccessMessage] = useState<String>("");
  const [errorMessage, setErrorMessage] = useState<String>("");

  // Use useDateTimeSelection hook
  const {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    timeError,
    handleStartTimeChange,
    handleEndTimeChange,
  } = useDateTimeSelection("10:00", "11:00");

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { name, value } = target;
    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: value,
    }));
    
  };

  // handling changes to the social media fields
  const handleSocialMediaChange = (key: keyof Activity['eventSocialMedia'], value: string) => {
    setEventData((prev) => ({
      ...prev,
      eventSocialMedia: {
        ...prev.eventSocialMedia,
        // update the correct social media field
        [key]: value, 
      },
    }));
  };

  const handleTagClick = (tag: string) => {
    setEventData((prevEventData) => {
      if (prevEventData.eventTags.includes(tag)) {
        // If the tag is already selected, remove it from the array
        return {
          ...prevEventData,
          eventTags: prevEventData.eventTags.filter((t) => t !== tag),
        };
      } else {
        // If the tag is not selected, add it to the array
        return {
          ...prevEventData,
          eventTags: [...prevEventData.eventTags, tag],
        };
      }
    });
  };

  // converting time format to 12hr 
  const to12HourTime = (time: string): string => {
     // returning an empty string if no time given
    if (!time) {
      return '';
    }

    const [hour, minute] = time.split(':');
    const hh = parseInt(hour, 10);
    const suffix = hh >= 12 ? 'PM' : 'AM';
    const adjustedHour = hh % 12 || 12;
    const formattedHour = adjustedHour < 10 ? `0${adjustedHour}` : adjustedHour.toString();
    return `${formattedHour}:${minute}${suffix}`;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Event Data: ", eventData);
    const newErrors = validateFormData(eventData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      createActivity(eventData as Activity);
    }
  };

  const createActivity = async (activityData: Activity) => {
    // retrieving the token from localStorage
    const token = localStorage.getItem('token');

    // applying necessary transformations for date, time, and speaker feilds
    const dataToSend = { ...activityData };

    if (selectedDate) {
      dataToSend.eventDate = selectedDate.toISOString().split('T')[0];
    }
    if (startTime) {
      dataToSend.eventStartTime = to12HourTime(startTime);
    }
    if (endTime) {
      dataToSend.eventEndTime = to12HourTime(endTime);
    }
    if (typeof dataToSend.eventSpeakers === 'string') {
      dataToSend.eventSpeakers = [dataToSend.eventSpeakers];
    }
    
    console.log("Event data after applying transformation: ", dataToSend);

    try {
      const queryClient = useQueryClient()
      const response = await fetch("http://localhost:3000/api/events/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Activity created:", data);
        await queryClient.refetchQueries({queryKey:['myEvents']})
        setSuccessMessage(data.message || "Event  successfully created!");
        setErrorMessage("");
        // todo: navigate to a success page and clear form
      } else {
        console.log("Failed to create activity:", response.status);
        throw new Error(data.message || "Failed to create the event.");
      }
    } catch (error) {
      // type guard to check if error is an instance of Error
      if (error instanceof Error) {
        console.error("Error creating activity:", error);
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };


  return {
    setEventData,
    setErrors,
    to12HourTime,
    eventData, 
    handleInputChange, 
    handleSocialMediaChange,
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
    successMessage, 
    errorMessage,
    setErrorMessage,
    setSuccessMessage
  };
}