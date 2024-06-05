import SignUp from '@/app/auth/sign-up/page'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mocks router for jest testing
jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

describe('Sign up page tests', () => {
  // Arrange
  beforeEach(() => {
    jest.clearAllMocks();
    render(<SignUp />)
  })
  it('render contains title, submit button, and sign in link', () => {
    const titleMap: Record<string, string> = {
      heading: 'sign up',
      button: 'sign up',
      link: 'sign in',
    }

    for (const type in titleMap) {
      // Act
      const component = screen.queryByRole(type, {
        name: new RegExp(titleMap[type], 'i'),
      })
      // Assert
      expect(component).toBeInTheDocument()
    }
  })

  it('sign in link direct to localhost /auth/sign-up route', () => {
    // Arrange
    const signinLink = screen.getByRole('link', { name: /sign in/i })

    // Act
    fireEvent.click(signinLink)

    // Assert
    expect(signinLink).toHaveProperty('href', 'http://localhost/auth/sign-in')
  })
})