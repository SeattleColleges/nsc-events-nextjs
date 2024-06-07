import { Activity, FormErrors } from "@/models/activity";
import { ActivityDatabase } from "@/models/activityDatabase";


export const validateFormData = (data: Activity | ActivityDatabase): FormErrors => {
  let newErrors: FormErrors = {};
  // basic validation rules, extend as needed
  if (!data.eventTitle) {
    newErrors = { ...newErrors, eventTitle: "Event title is required" };
  }
  if (!data.eventDescription) {
    newErrors = {
      ...newErrors,
      eventDescription: "Event description is required",
    };
  }
  if (!data.eventCategory) {
    newErrors = { ...newErrors, eventCategory: "Event Category is required" };
  }
  if (!data.eventLocation) {
    newErrors = { ...newErrors, eventLocation: "Event location is required" };
  }
  if (!data.eventHost) {
    newErrors = { ...newErrors, eventHost: "Event host is required" };
  }
  if (!data.eventRegistration) {
    newErrors = {
      ...newErrors,
      eventRegistration: "Event registration is required",
    };
  }
  if (!data.eventCapacity && data.eventCapacity !== 0) {
    newErrors = { ...newErrors, eventCapacity: "Event capacity is required"  };
  }
  if (!data.eventSchedule) {
    newErrors = { ...newErrors, eventSchedule: "Event schedule is required" };
  }
  if (!data.eventSpeakers) {
    newErrors = { ...newErrors, eventSpeakers: "Event speakers is required" };
  }
  if (!data.eventPrerequisites) {
    newErrors = {
      ...newErrors,
      eventPrerequisites: "Event prerequisites is required",
    };
  }
  if (!data.eventCancellationPolicy) {
    newErrors = {
      ...newErrors,
      eventCancellationPolicy: "Event cancellation policy is required",
    };
  }
  if (!data.eventContact) {
    newErrors = { ...newErrors, eventContact: "Event contact is required" };
  }
  if (!data.eventAccessibility) {
    newErrors = {
      ...newErrors,
      eventAccessibility: "Event accessibility is required",
    };
  }
  // todo: add more error validation rules

  if (data.eventDate || !data.eventDate) {
    try {
      new Date(data.eventDate).toISOString();
    } catch {
      newErrors = { ...newErrors, eventDate: "Event date should be in valid date format 'MM/DD/YYYY' (e.g. 01/01/2000)" };
    }
  }
  
  if (data.eventCoverPhoto || !data.eventCoverPhoto) {
    try {
      new URL(data.eventCoverPhoto);
    } catch {
      newErrors = { ...newErrors, eventCoverPhoto: "Event cover photo needs to be a valid URL"  };
    }
  }

  if (data.eventMeetingURL || !data.eventMeetingURL) {
    try {
      new URL(data.eventMeetingURL);
    } catch {
      newErrors = { ...newErrors, eventMeetingURL: "Event meeting URL needs to be a valid URL"  };
    }
  }

  // Overrides previous eventCapacity error check
  if (data.eventCapacity && isNaN(data.eventCapacity) || data.eventCapacity < 1) {
    newErrors = { ...newErrors, eventCapacity: "Event capacity should be a number greater than 0"  };
  }

  if (data.eventTags.length < 1) {
    newErrors = { ...newErrors, eventTags: "Please select an event tag" };
  }

  if (data.eventSpeakers.length < 1) {
    newErrors = { ...newErrors, eventSpeakers: "Must specify at least one event speaker"  };
  }

  // Simple email check, does not verify if it exists or not
  if (data.eventContact && !data.eventContact.includes("@")) {
    newErrors = { ...newErrors, eventContact: "Must be a valid email address"  };
  }

  if (data.eventPrivacy.length < 1) {
    newErrors = { ...newErrors, eventPrivacy: "Must include event privacy details"  };
  }

  return newErrors;
};