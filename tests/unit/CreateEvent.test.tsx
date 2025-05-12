import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CreateEvent from '@/app/create-event/page';
import { useEventForm } from '@/hooks/useEventForm';


jest.mock('@/hooks/useAuth', () => ({
    __esModule: true,
    default: () => ({
        isAuth: true,
        user: { role: 'admin' },
    }),
}));

jest.mock('@/hooks/useEventForm', () => ({
    __esModule: true,
    useEventForm: () => ({
        eventData: {
            eventTitle: '',
            eventDescription: '',
            eventCategory: '',
            eventLocation: '',
            eventCoverPhoto: '',
            eventDocument: '',
            eventHost: '',
            eventMeetingURL: '',
            eventRegistration: '',
            eventCapacity: '',
            eventTags: [],
            eventSchedule: '',
            eventSpeakers: '',
            eventPrerequisites: '',
            eventCancellationPolicy: '',
            eventContact: '',
            eventSocialMedia: {
                facebook: '',
                twitter: '',
                instagram: '',
                hashtag: '',
            },
            eventPrivacy: '',
            eventAccessibility: '',
            eventNote: '',
        },
        handleInputChange: jest.fn(),
        handleSocialMediaChange: jest.fn(),
        handleTagClick: jest.fn(),
        handleSubmit: jest.fn((e) => e.preventDefault()),
        errors: {
            eventTitle: 'Required',
        },
        selectedDate: new Date(),
        setSelectedDate: jest.fn(),
        startTime: '',
        handleStartTimeChange: jest.fn(),
        endTime: '',
        handleEndTimeChange: jest.fn(),
        timeError: '',
        successMessage: '',
    }),
}));


jest.mock('@/components/TagSelector', () => () => <div>TagSelector</div>);
jest.mock('@/components/UnauthorizedPageMessage', () => () => <div>Unauthorized</div>);

const queryClient = new QueryClient();
const theme = createTheme();

const renderWithProviders = (ui: React.ReactElement) =>
    render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>{ui}</ThemeProvider>
        </QueryClientProvider>
    );

describe('CreateEvent Page', () => {
    it('renders the form when user is admin or creator', () => {
        renderWithProviders(<CreateEvent />);
        expect(screen.getByText(/Add Event/i)).toBeInTheDocument();
    });

    it('shows validation error when required fields are empty', async () => {
        renderWithProviders(<CreateEvent />);
        const button = screen.getByRole('button', { name: /Create Event/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('Required')).toBeInTheDocument();
        });
    });
});

