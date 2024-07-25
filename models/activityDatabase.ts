export interface ActivityDatabase {
    _id: string;
    createdByUser: string;
    eventTitle: string;
    eventDescription: string;
    eventCategory: string;
    eventDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventLocation: string;
    eventCoverPhoto: string;
    eventDocument: string;
    eventHost: string;
    eventRegistration: string;
    eventCapacity: number;
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
    attendanceCount: number;
    eventPrivacy: string;
    eventAccessibility: string;
    eventMeetingURL: string;
    eventNote: string;
    isHidden?: boolean;
    isArchived?: boolean;
}

export const activityDatabase: ActivityDatabase = {
    _id: "",
    createdByUser: "",
    eventTitle: "",
    eventDescription: "",
    eventCategory: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventLocation: "",
    eventMeetingURL: "",
    eventCoverPhoto: "",
    eventDocument: "",
    eventHost: "",
    eventRegistration: "",
    eventCapacity: 0,
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
    attendanceCount: 0,
    eventPrivacy: "",
    eventNote: "",
    eventAccessibility: ""
};
