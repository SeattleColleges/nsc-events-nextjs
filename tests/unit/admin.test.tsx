import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../../app/admin/page';

describe('Admin', () => {
    it('renders the buttons', () => {
        render(<Page />)
        const button = screen.getAllByRole('button')
        const buttonText = screen.getByText('Edit User Role')
        expect(button && buttonText).toBeInTheDocument()
    })
})