export interface ActivityDatabase {
    _id: string;
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
    isHidden?: boolean;
}

export const activityDatabase: ActivityDatabase = {
    _id: "",
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
