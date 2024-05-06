import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CreateEvent from '..//..//app/create-event/page';

describe('CreateEvent', () => {
  it('renders the form fields', () => {
    render(<CreateEvent />)
    const fields = screen.getAllByRole('textbox')
    const select = screen.getByRole('listbox')
    const dateField = screen.getByRole('spinbutton', { name: 'Event Date' })
    const startTimeField = screen.getByRole('spinbutton', { name: 'Start Time' })
    const endTimeField = screen.getByRole('spinbutton', { name: 'End Time' })
    const button = screen.getByRole('button', { name: 'Create Event' })

    expect(fields.length).toBeGreaterThan(0)
    expect(select).toBeInTheDocument()
    expect(dateField).toBeInTheDocument()
    expect(startTimeField).toBeInTheDocument()
    expect(endTimeField).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('renders the error messages when there are errors', () => {
    const errors = {
      eventTitle: 'Event Title is required',
      eventDescription: 'Event Description is required',
      eventCategory: 'Event Category is required',
      eventDate: 'Event Date is required',
      startTime: 'Start Time is required',
      endTime: 'End Time is required',
      eventLocation: 'Event Location is required',
      eventCoverPhoto: 'Event Cover Photo is required',
      eventHost: 'Event Host is required',
      eventMeetingUrl: 'Event Meeting URL is required',
      eventRegistration: 'Event Registration is required',
      eventCapacity: 'Event Capacity is required',
      eventSchedule: 'Event Schedule is required',
      eventSpeakers: 'Event Speakers is required',
      eventPrerequisites: 'Event Prerequisites is required',
      eventCancellationPolicy: 'Event Cancellation Policy is required',
      eventContact: 'Event Contact is required',
      facebook: 'Facebook is required',
      twitter: 'Twitter is required',
      instagram: 'Instagram is required',
      hashtag: 'Hashtag is required',
      eventPrivacy: 'Event Privacy is required',
      eventAccessibility: 'Event Accessibility is required',
      eventNote: 'Event Note is required',
    }

    render(<CreateEvent errors={errors} />)

    Object.entries(errors).forEach(([key, value]) => {
      const errorElement = screen.getByText(value)
      expect(errorElement).toBeInTheDocument()
    })
  })

  it('renders the success message when the form is submitted successfully', () => {
    const successMessage = 'Event created successfully'

    render(<CreateEvent successMessage={successMessage} />)

    const successElement = screen.getByText(successMessage)
    expect(successElement).toBeInTheDocument()
  })
})