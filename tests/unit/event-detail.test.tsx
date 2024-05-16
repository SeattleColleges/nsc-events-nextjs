import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import EventDetail from '@/app/event-detail/page'

describe('EventDetail', () => {
  it('renders the event details', () => {
    const searchParams = { id: 'test-event-id' }
    render(<EventDetail searchParams={searchParams} />)

    const title = screen.getByText('Test Event')
    const description = screen.getByText('Test Description')
    const location = screen.getByText('Test Location')
    const date = screen.getByText('Mar 14, 2023') // formatDate function is not provided, assuming it formats the date to this format

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(location).toBeInTheDocument()
    expect(date).toBeInTheDocument()
  })

})