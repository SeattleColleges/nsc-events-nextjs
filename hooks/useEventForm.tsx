import { ChangeEventHandler, FormEvent, useState } from "react";
import { validateFormData } from "@/utility/validateFormData";
import { Activity, FormErrors } from "@/models/activity";
import useDateTimeSelection from "./useDateTimeSelection";

export const useEventForm = (initialData: Activity) => {

  const [eventData, setEventData] = useState<Activity>(initialData);
  const [errors, setErrors] = useState<FormErrors>({
    eventTitle: "",
    eventDescription: "",
    eventCategory: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventLocation: "",
    eventCoverPhoto: "",
    eventHost: "",
    eventWebsite: "",
    eventRegistration: "",
    eventCost: "",
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(eventData);
    const newErrors = validateFormData(eventData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      createActivity(eventData);
    }
  };

  const createActivity = async (activityData: any) => {
    try {
      const response = await fetch("http://localhost:3000/api/activity/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activityData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Activity created:", data);
      } else {
        console.log("Failed to create activity:", response.status);
      }
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };


  return { 
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
    timeError 
  };
}