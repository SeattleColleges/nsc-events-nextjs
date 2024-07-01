import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../../app/admin/page';
import useAuth from '@/hooks/useAuth'

jest.mock('@/hooks/useAuth', () => ({
    __esModule: true,
    default: jest.fn(),
  }))
  
describe('Admin', () => {
    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
          isAuth: true,
          user: { role: 'admin' }
        })
      })

    it('renders the buttons', () => {
        render(<Page />)
        const button = screen.getAllByRole('button')
        const buttonText = screen.getByText('Edit User Role')
        expect(button.length).toBeGreaterThan(0)
        expect(buttonText).toBeInTheDocument()
    })
})