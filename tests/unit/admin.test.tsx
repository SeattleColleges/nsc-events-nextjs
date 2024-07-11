import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../../app/admin/page';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Mock next/link component
jest.mock('next/link', () => {
    return ({ children, href }: {children: React.ReactNode, href: string}) => {
        return <a href={href}>{children}</a>;
    };
});

// Mock next/router
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Admin', () => {
    const renderComponent = () => {
        render(<Page />);
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

    it('buttons link to correct paths', () => {
        renderComponent();
        expect(screen.getByText('Edit User Role').closest('a')).toHaveAttribute('href', '/edit-user-role-page');
        expect(screen.getByText('Create Event').closest('a')).toHaveAttribute('href', '/create-event');
        expect(screen.getByText('View My Events').closest('a')).toHaveAttribute('href', '/my-events');
        expect(screen.getByText('View Archived Events').closest('a')).toHaveAttribute('href', '/archived-events');
        expect(screen.getByText('View All Events').closest('a')).toHaveAttribute('href', '/');
    });
})