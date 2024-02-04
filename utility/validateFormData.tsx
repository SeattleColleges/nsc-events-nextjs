import { Activity, FormErrors } from "@/models/activity";


export const validateFormData = (data: Activity): FormErrors => {
  
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
  if (!data.eventCapacity) {
    newErrors = { ...newErrors, eventCapacity: "Event capacity is required" };
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
  return newErrors;

}