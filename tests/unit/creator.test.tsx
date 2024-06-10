import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '..//..//app/creator/page';

describe('Creator', () => {
  it('renders the buttons', () => {
    render(<Page/>)
    const buttons = screen.getAllByRole('button')
    const buttonTexts = [
      screen.getByText('Create Event'),
      screen.getByText('View My Events'),
      screen.getByText('View All Events'),
    ]
    expect(buttons.length).toBe(4)
  })

  it('renders links with correct hrefs', () => {
    render(<Page/>)
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/create-event')
    expect(links[1]).toHaveAttribute('href', '/my-events')
    expect(links[2]).toHaveAttribute('href', '/archived-events')
    expect(links[3]).toHaveAttribute('href', '/')
  })
} )

