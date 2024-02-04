// Define FormErrors interface
export interface FormErrors {
    eventTitle?: string;
    eventDescription?: string;
    eventCategory?: string;
    eventStartTime?: string;
    eventEndTime?: string;
    eventSchedule?: string;
    eventLocation?: string;
    eventHost?: string;
    eventRegistration?: string;
    eventCapacity?: string;
    eventSpeakers?: string;
    eventPrerequisites?: string;
    eventCancellationPolicy?: string;
    eventContact?: string;
    eventAccessibility?: string;
  };

// Additional states not directly related to formData might need their own handling.
export interface AdditionalState {
    selectedDate: Date | null;
    startTime: string;
    endTime: string;
    timeError: string | null;
  }

export interface Activity {
    eventCreatorId: string;
    eventTitle: string;
    eventDescription: string;
    eventCategory: string;
    eventDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventLocation: string;
    eventCoverPhoto: string;
    eventHost: string;
    eventWebsite: string;
    eventRegistration: string;
    eventCapacity: number;
    eventCost: string;
    eventTags: string[];
    eventSchedule: string;
    eventSpeakers: string[];
    eventPrerequisites: string;
    eventCancellationPolicy: string;
    eventContact: string;
    eventSocialMedia: {
        facebook: string;
        twitter: string;
        instagram: string;
        hashtag: string;
    };
    eventPrivacy: string;
    eventAccessibility: string;
}

export const activity: Activity = {
    eventCreatorId: "",
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
    eventCapacity: 0,
    eventCost: "",
    eventTags: [],
    eventSchedule: "",
    eventSpeakers: [],
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
};
