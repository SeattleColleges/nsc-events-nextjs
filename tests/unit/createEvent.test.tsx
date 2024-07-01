// tests/unit/createEvent.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import CreateEvent from "@/app/create-event/page";

jest.mock("@/hooks/useEventForm", () => ({
  useEventForm: () => ({
    eventData: {
      eventTitle: "",
      eventDescription: "",
      eventCategory: "",
      eventLocation: "",
      eventCoverPhoto: "",
      eventHost: "",
      eventMeetingURL: "",
      eventRegistration: "",
      eventCapacity: "",
      eventTags: [],
      eventSchedule: "",
      eventSpeakers: "",
      eventPrerequisites: "",
      eventCancellationPolicy: "",
      eventContact: "",
      eventSocialMedia: {},
      eventPrivacy: "",
      eventAccessibility: "",
      eventNote: "",
    },
    handleInputChange: jest.fn(),
    handleSocialMediaChange: jest.fn(),
    handleTagClick: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
    selectedDate: null,
    setSelectedDate: jest.fn(),
    startTime: "",
    handleStartTimeChange: jest.fn(),
    endTime: "",
    handleEndTimeChange: jest.fn(),
    timeError: "",
    successMessage: "",
    errorMessage: ""
  })
}));

jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    isAuth: true,
    user: { role: "admin" }
  })
}));

describe("CreateEvent", () => {
  test("renders CreateEvent component", () => {
    render(<CreateEvent />);
    expect(screen.getByText("Add Event")).toBeInTheDocument();
  });

  test("allows entering event title", () => {
    render(<CreateEvent />);
    const titleInput = screen.getByLabelText("Event Title") as HTMLInputElement;
    fireEvent.change(titleInput, { target: { value: "New Event" } });
    expect(titleInput.value).toBe("New Event");
  });

  // Add more tests as needed
});
