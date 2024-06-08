import Signin from '@/app/auth/sign-in/page'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Creates routing mock
jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

describe('Sign-in page tests', () => {
  // Arrange
  beforeEach(() => {
    jest.clearAllMocks();
    render(<Signin />)
  })

  it('checks if header and button render', () => {
    // Act
    const titleRegx = new RegExp('sign in', 'i')
    const pageHeader = screen.getByRole('heading', { name: titleRegx })
    const signinBtn = screen.getByRole('button', { name: titleRegx })

    // Assert
    expect(pageHeader).toBeInTheDocument()
    expect(signinBtn).toBeInTheDocument()
  })
  it('render link and checks if links routes', async () => {
    // Once we figure out to mock useRouter, we can do thorough route testing

    const labels: Record<string, string> = {
      'Forgot password?': '/auth/forgot-password',
      'sign up': '/auth/sign-up',
    }
    for (const title in labels) {
      // Act
      const nameRegx = new RegExp(title, 'i')
      const getLink = screen.getByRole('link', { name: nameRegx })

      // Assert
      expect(getLink).toHaveProperty('href', `http://localhost${labels[title]}`)
    }
  })
})