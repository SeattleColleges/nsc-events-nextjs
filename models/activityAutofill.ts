import { Activity } from './activity'; // Assuming the Event interface is exported from 'event.ts' in the same directory

const activityAutofill: Activity = {
    eventCreatorId: 'user-guid',
    eventTitle: "Sample Event",
    eventDescription: "This is a sample event description.",
    eventCategory: "Tech",
    eventDate: "2023-08-15",
    eventStartTime: "10:00 AM",
    eventEndTime: "4:00 PM",
    eventLocation: "123 Main Street, City",
    eventMeetingURL: "https://zoom.us/sample-url",
    eventCoverPhoto: "https://example.com/event-cover.jpg",
    eventHost: "Sample Organization",
    eventRegistration: "Register at https://example.com/registration",
    eventCapacity: 100,
    eventTags: ["Tech", "Conference", "Networking"],
    eventSchedule: "10:00 AM - Registration\n11:00 AM - Keynote\n12:00 PM - Lunch\n2:00 PM - Workshops\n4:00 PM - Closing Remarks",
    eventSpeakers: ["John Doe", "Jane Smith"],
    eventPrerequisites: "None",
    eventCancellationPolicy: "Full refund if canceled at least 7 days before the event.",
    eventContact: "contact@example.com",
    eventSocialMedia: {
        facebook: "https://www.facebook.com/sampleevent",
        twitter: "https://twitter.com/sampleevent",
        instagram: "https://www.instagram.com/sampleevent",
        hashtag: "#SampleEvent2023"
    },
    eventPrivacy: "Public",
    eventAccessibility: "Wheelchair accessible venue.",
    eventNote: "This is a sample note.",
};

export default activityAutofill;