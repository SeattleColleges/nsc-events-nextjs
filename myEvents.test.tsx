import { render, screen } from '@testing-library/react';
import MyEvents from '@/app/my-events/page';
import useAuth from '@/hooks/useAuth';
import '@testing-library/jest-dom';

jest.mock('@/hooks/useAuth');
jest.mock('@/components/UnauthorizedPageMessage', () => () => <div>Unauthorized</div>);
jest.mock('@/components/ViewMyEventsGetter', () => () => <div>My Events List Component</div>);

describe('MyEvents Page', () => {
  it('renders UnauthorizedPageMessage if the user is not authorized', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuth: false, user: null });
    render(<MyEvents />);
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });

  it('renders My Created Events title for authorized users', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuth: true, user: { role: 'admin' } });
    render(<MyEvents />);
    expect(screen.getByText('My Created Events')).toBeInTheDocument();
  });

  it('renders MyEventsList component for authorized users', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuth: true, user: { role: 'creator' } });
    render(<MyEvents />);
    expect(screen.getByText('My Events List Component')).toBeInTheDocument();
  });
});
