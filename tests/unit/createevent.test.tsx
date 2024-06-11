import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateEvent from '../../app/create-event/page';

jest.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isAuth: true,
    user: { role: 'admin' }
  }))
}));

describe('CreateEvent component', () => {
  test('renders with authentication and admin/creator role', () => {
    const { getByLabelText, getByText } = render(<CreateEvent />);

    fireEvent.change(getByLabelText('Event Title'), { target: { value: 'Test Event' } });
    fireEvent.change(getByLabelText('Event Description'), { target: { value: 'Test Description' } });

    fireEvent.click(getByText('Create Event'));

    expect(getByText('Success message')).toBeInTheDocument();
  });

  test('renders unauthorized page message without authentication or non-admin/creator role', () => {
    jest.mock('../hooks/useAuth', () => ({
      __esModule: true,
      default: jest.fn(() => ({
        isAuth: false,
        user: null
      }))
    }));

    const { getByText } = render(<CreateEvent />);

    expect(getByText('Unauthorized Page Message')).toBeInTheDocument();
  });
});
