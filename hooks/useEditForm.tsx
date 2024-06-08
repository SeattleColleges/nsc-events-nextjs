import { FormEvent, useEffect, useState } from "react";
import { validateFormData } from "@/utility/validateFormData";
import useDateTimeSelection from "./useDateTimeSelection";
import { ActivityDatabase } from "@/models/activityDatabase";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { useEventForm } from "@/hooks/useEventForm";
import { format, parse } from "date-fns";

export const useEditForm = (initialData: ActivityDatabase) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const queryClient = useQueryClient();
  const {
    setEventData,
    setErrors,
    errors,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
    eventData,
    to12HourTime,
    handleInputChange,
    handleSocialMediaChange,
    handleTagClick,
  } = useEventForm(initialData as ActivityDatabase);

  useEffect(() => {
    setEventData(initialData as ActivityDatabase)
    setSelectedDate(new Date(eventData.eventDate))
  }, [eventData.eventDate, initialData, setEventData]);

  const {
    timeError,
    handleStartTimeChange,
    handleEndTimeChange,
    startTime,
    endTime
  } = useDateTimeSelection(eventData.eventStartTime.slice(0, -2),  eventData.eventEndTime.slice(0, -2));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateFormData(eventData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      editEventMutation(eventData as ActivityDatabase);
    }
  };

  const handleDateChange = (newDate: Date | null)  => {
    setSelectedDate(newDate);
  };

const to24HourTime  = (time: string) => {
    return parse(time, 'hh:mma', new Date());
  }

  // Handlers for TimePicker changes, converting Date back to string
  const onStartTimeChange = (date: Date | null) => {
    const timeStr = date ? format(date, 'HH:mm') : '';
    handleStartTimeChange(timeStr);
  };

  const onEndTimeChange = (date: Date | null) => {
    const timeStr = date ? format(date, 'HH:mm') : '';
    handleEndTimeChange(timeStr);
  };

  const editEvent = async (activityData: ActivityDatabase) => {
    // retrieving the token from localStorage
    const token = localStorage.getItem('token');

    // applying necessary transformations for date, time, speaker fields, and createdByUserId
    const { createdByUser, ...dataToSend } = activityData;

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


    try {
      const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
      const response = await fetch(`${apiUrl}/events/update/${dataToSend._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Event updated:", data);
        return response.status
      } else {
        throw new Error(data.message || "Failed to update event.");
      }
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  const { mutate: editEventMutation }  = useMutation({
    mutationFn: editEvent,
    onSuccess: async () => {
      await queryClient.refetchQueries({queryKey:['events', 'myEvents', 'archivedEvents']});
      setSuccessMessage( "Event successfully updated!");
      setTimeout( () => {
        window.location.reload()
      }, 1200)

    },

    onError: (error: any) => {
      if (error instanceof Error) {
        console.error("Error updating event:", error);
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  })

  return {
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
    errorMessage
  };
}