import { ChangeEventHandler, FormEvent, useState } from "react";
import { validateFormData } from "@/utility/validateFormData";
import { Activity, FormErrors } from "@/models/activity";

export const useEventForm = (initialData: Activity) => {

  const [eventData, setEventData] = useState<Activity>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("11:00");
  const [timeError, setTimeError] = useState<string | null>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { name, value } = target;
    setEventData((prevEventData) => ({
      ...prevEventData,
      [name]: value,
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


  // handling logic for time selection
  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    if (endTime && time >= endTime) {
      setTimeError("End time must be after start time");
    } else {
      // clearing any error msgs if time selection is valid
      setTimeError(null);
    }
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
    if (startTime && time <= startTime) {
      setTimeError("End time must be after start time");
    } else {
      // clearing any error msgs if time selection is valid
      setTimeError(null);
    }
  };


  return { eventData, handleInputChange, handleTagClick, handleSubmit, errors, selectedDate, setSelectedDate, startTime, setStartTime, handleStartTimeChange, endTime, setEndTime, handleEndTimeChange, timeError, setTimeError };

}