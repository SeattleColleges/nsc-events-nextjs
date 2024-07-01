import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../../app/admin/page';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Mock next/link component
jest.mock('next/link', () => {
    return ({ children, href }) => {
        return <a href={href}>{children}</a>;
    };
});

// Mock next/router
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Admin', () => {
    it('renders the buttons', () => {
        render(<Page />)
        const button = screen.getAllByRole('button')
        const buttonText = screen.getByText('Edit User Role')
        expect(button && buttonText).toBeInTheDocument()
    })
})