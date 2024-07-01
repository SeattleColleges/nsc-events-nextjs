// tests/unit/edit-user-role-page.test.tsx
import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from '@testing-library/react'
import EditUserRolePage from '../../app/edit-user-role-page/page'
import useAuth from '@/hooks/useAuth'

// Mock the useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// Mock the UserCard component
jest.mock('../../components/UserCard', () => ({ user }: any) => (
  <div data-testid="user-card">
    <p>{user.firstName} {user.lastName}</p>
  </div>
))

describe('EditUserRolePage', () => {
  beforeEach(() => {
    // Mock the fetch API
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: '65f746226a9e5ccd0c0a6052', firstName: 'user', lastName: 'user', email: 'user@gmail.com', role: 'creator' },
          { id: '65f7462a6a9e5ccd0c0a6055', firstName: 'user', lastName: 'user', email: 'admin@gmail.com', role: 'admin' },
        ])
      })
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the page title', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      user: { role: 'admin' }
    })

    await act(async () => {
      render(<EditUserRolePage />)
    })

    const title = screen.getByText('User Management')
    expect(title).toBeInTheDocument()
  })

  it('fetches and displays user information', async () => {
    // Mock the useAuth hook to return an authenticated admin user
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      user: { role: 'admin' }
    })

    await act(async () => {
      render(<EditUserRolePage />)
    })

    await waitFor(() => {
      const userCards = screen.getAllByTestId('user-card')
      expect(userCards).toHaveLength(2)
      expect(userCards[0]).toHaveTextContent('user user')
      expect(userCards[1]).toHaveTextContent('user user')
    })
  })
})
