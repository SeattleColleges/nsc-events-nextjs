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
    const renderComponent = () => {
        render(<Admin />);
    };

    it('renders the buttons', () => {
        render(<Page />)
        const button = screen.getAllByRole('button')
        const buttonText = screen.getByText('Edit User Role')
        expect(button && buttonText).toBeInTheDocument()
    })

    it('renders the Admin component', () => {
        renderComponent();
        expect(screen.getByText('Edit User Role')).toBeInTheDocument();
        expect(screen.getByText('Create Event')).toBeInTheDocument();
        expect(screen.getByText('View My Events')).toBeInTheDocument();
        expect(screen.getByText('View Archived Events')).toBeInTheDocument();
        expect(screen.getByText('View All Events')).toBeInTheDocument();
    });
})