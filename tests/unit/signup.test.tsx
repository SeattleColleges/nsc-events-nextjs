import SignUp from '@/app/auth/sign-up/page'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock useRouter hook
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'), // Use actual implementation for useRouter
  useRouter: jest.fn(),
}))

describe('Sign up page tests', () => {
  beforeEach(() => {
    // Mock the useRouter object
    useRouter.mockReturnValue({
      push: jest.fn(),
    });

    render(<SignUp />)
  })

  it('sign in link directs to localhost /auth/sign-in route', () => {
    // Act
    const signInLink = screen.getByRole('link', { name: /Log In/i })
    fireEvent.click(signInLink)

    // Assert
    expect(require('next/router').useRouter().push).toHaveBeenCalledWith('/auth/sign-in')
  })
})
