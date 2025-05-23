import { Activity, FormErrors, activity } from "@/models/activity";
import { ActivityDatabase, activityDatabase } from "@/models/activityDatabase";


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

  if (!data.eventLocation) {
    newErrors = { ...newErrors, eventLocation: "Event location is required" };
  }
  if (!data.eventHost) {
    newErrors = { ...newErrors, eventHost: "Event host is required" };
  }

  if (!data.eventCapacity && data.eventCapacity !== 0) {
    newErrors = { ...newErrors, eventCapacity: "Event capacity is required"  };
  }
  
  if (!data.eventContact) {
    newErrors = { ...newErrors, eventContact: "Event contact is required" };
  }
  
  // Overrides previous eventCapacity error check
  if (data.eventCapacity && isNaN(data.eventCapacity) || data.eventCapacity < 1) {
    newErrors = { ...newErrors, eventCapacity: "Event capacity should be a number greater than 0"  };
  }

  if (data.eventTags.length < 1) {
    newErrors = { ...newErrors, eventTags: "Please select an event tag" };
  }

  // Tests if email is valid by using regex
  if (data.eventContact) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(data.eventContact)) {
      newErrors = { ...newErrors, eventContact: "Must be a valid email address"  };
    }
  }

  // Tests if URL is valid (keep this check for now, may be removed later)
  const urlPattern = /^(http(s)?:\/\/){0,1}(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(?:[/?].*)?$/;
  if (!data.eventMeetingURL || !urlPattern.test(data.eventMeetingURL)) {
    newErrors = { ...newErrors, eventMeetingURL: "Event meeting URL needs to be a valid URL" };
  }

  // NO LONGER NEEDED
  /*
  if (data.eventPrivacy.length < 1) {
    newErrors = { ...newErrors, eventPrivacy: "Must include event privacy details"  };
  }
  */

  // NO LONGER NEEDED
  /*
  if (data.eventSpeakers.length < 1) {
    newErrors = { ...newErrors, eventSpeakers: "Must specify at least one event speaker"  };
  }
  */

  // NO LONGER NEEDED
  // todo: add more error validation rules
  /*
  const urlPattern = /^(http(s)?:\/\/){0,1}(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(?:[/?].*)?$/;
  if (!data.eventCoverPhoto || !urlPattern.test(data.eventCoverPhoto)) {
      newErrors = { ...newErrors, eventCoverPhoto: "Event cover photo needs to be a valid URL"  };
  }
  if (!data.eventDocument || !urlPattern.test(data.eventDocument)) {
    newErrors = { ...newErrors, eventDocument: "Event document needs to be a valid URL"  };
  }
  if (!data.eventMeetingURL || !urlPattern.test(data.eventMeetingURL)) {
      newErrors = { ...newErrors, eventMeetingURL: "Event meeting URL needs to be a valid URL" };
  }
  */

  // NO LONGER NEEDED
  // todo: add more error validation rules
  /*
  const urlPattern = /^(http(s)?:\/\/){0,1}(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(?:[/?].*)?$/;
  if (!data.eventCoverPhoto || !urlPattern.test(data.eventCoverPhoto)) {
      newErrors = { ...newErrors, eventCoverPhoto: "Event cover photo needs to be a valid URL"  };
  }
  if (!data.eventDocument || !urlPattern.test(data.eventDocument)) {
    newErrors = { ...newErrors, eventDocument: "Event document needs to be a valid URL"  };
  }
  if (!data.eventMeetingURL || !urlPattern.test(data.eventMeetingURL)) {
      newErrors = { ...newErrors, eventMeetingURL: "Event meeting URL needs to be a valid URL" };
  }
  */

  // NO LONGER NEEDED
  /*
  if (!data.eventAccessibility) {
    newErrors = {
      ...newErrors,
      eventAccessibility: "Event accessibility is required",
    };
  }
  */

  // NO LONGER NEEDED
  /*
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
  */

  // NO LONGER NEEDED
  /*
  if (!data.eventRegistration) {
    newErrors = {
      ...newErrors,
      eventRegistration: "Event registration is required",
    };
  }
  */

  // NO LONGER NEEDED
  /*
  if (!data.eventCategory) {
    newErrors = { ...newErrors, eventCategory: "Event Category is required" };
  }
  */

  return newErrors;
};