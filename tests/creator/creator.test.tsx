import { render, fireEvent, waitFor } from '@testing-library/react';
import Creator from '../../app/creator/page';
describe('Creator component', () => {
  it('renders with a Create Event button', () => {
    const { getByText } = render(<Creator />);
    expect(getByText('Create Event')).toBeInTheDocument();
  });

  it('renders with a View My Events button', () => {
    const { getByText } = render(<Creator />);
    expect(getByText('View My Events')).toBeInTheDocument();
  });

  it('renders with a View All Events button', () => {
    const { getByText } = render(<Creator />);
    expect(getByText('View All Events')).toBeInTheDocument();
  });

  it('calls the createEvent function when the Create Event button is clicked', () => {
    const createEventMock = jest.fn();
    const { getByText } = render(<Creator create-event={createEventMock} />);
    fireEvent.click(getByText('Create Event'));
    expect(createEventMock).toHaveBeenCalled();
  });
});