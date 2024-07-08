import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateEvent from '@/app/create-event/page';
import useAuth from '@/hooks/useAuth';

// Mock the useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('CreateEvent Component', () => {
  beforeEach(() => {
    // Mocking the useAuth hook return value
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'admin' },
      isAuth: true,
    });
  });

  test('renders CreateEvent form and submits with valid data', async () => {
    render(<CreateEvent />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/event name/i), { target: { value: 'Test Event' } });
    fireEvent.change(screen.getByLabelText(/event description/i), { target: { value: 'This is a test event.' } });
    fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2023-08-15' } });
    fireEvent.change(screen.getByLabelText(/event capacity/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/event speakers/i), { target: { value: 'Speaker1,Speaker2' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /create event/i }));

    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByText(/event created successfully/i)).toBeInTheDocument();
    });
  });

});
