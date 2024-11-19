import { render, screen } from '@testing-library/react';
import ArchivedEvents from '@/app/archived-events/page';
import useAuth from '@/hooks/useAuth';
import { useArchivedEvents } from '@/utility/queries';
import '@testing-library/jest-dom';

jest.mock('@/hooks/useAuth');
jest.mock('@/utility/queries');
jest.mock('@/components/UnauthorizedPageMessage', () => () => <div>Unauthorized</div>);

describe('ArchivedEvents Page', () => {
  beforeEach(() => {
    // Mock `useAuth` to simulate an authorized user
    (useAuth as jest.Mock).mockReturnValue({ isAuth: true, user: { role: 'admin' } });

    // Mock `useArchivedEvents` to return test data
    (useArchivedEvents as jest.Mock).mockReturnValue({
      data: [
        { _id: '1', eventTitle: 'Archived Event 1', eventDate: '2024-11-15' },
        { _id: '2', eventTitle: 'Archived Event 2', eventDate: '2024-12-01' },
      ],
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  it('renders UnauthorizedPageMessage if the user is not authorized', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuth: false, user: null });
    render(<ArchivedEvents />);
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });

  it('renders the list of archived events for authorized users', () => {
    render(<ArchivedEvents />);
    expect(screen.getByText('Archived Events')).toBeInTheDocument();
    expect(screen.getByText('Archived Event 1')).toBeInTheDocument();
    expect(screen.getByText('Archived Event 2')).toBeInTheDocument();
  });

  // Remove or adjust this test if not applicable
  it('does not render "Load more events" button', () => {
    render(<ArchivedEvents />);
    const loadMoreButton = screen.queryByRole('button', { name: /load more events/i });
    expect(loadMoreButton).not.toBeInTheDocument();
  });
});
