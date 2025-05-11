import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import ChangePassword from '@/app/auth/change-password/page';
import '@testing-library/jest-dom';
import * as api from '@/app/auth/change-password/changePasswordApi';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        prefetch: jest.fn(),
        replace: jest.fn(),
    }),
}));


jest.mock('@/app/auth/change-password/changePasswordApi');

describe('ChangePassword Component', () => {
    const mockChangePassword = api.changePassword as jest.Mock;

    beforeEach(() => {
        localStorage.setItem('token', 'test-token');
        mockChangePassword.mockReset();
    });

    it('renders all fields and submit button', () => {
        render(<ChangePassword />);

        // Use getByRole with name to avoid duplicate text issues
        const currentPasswordInput = screen.getByLabelText(/current password/i, { selector: 'input' });
        const newPasswordInput = screen.getByLabelText(/new password/i, { selector: 'input[name="newPassword"]' });
        const confirmPasswordInput = screen.getByLabelText(/confirm new password/i, { selector: 'input' });
        const button = screen.getByRole('button', { name: /change password/i });

        expect(currentPasswordInput).toBeInTheDocument();
        expect(newPasswordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('submits and shows success message', async () => {
        mockChangePassword.mockResolvedValueOnce({ status: 'success', message: 'Password Changed successful!' });

        render(<ChangePassword />);

        fireEvent.change(screen.getByLabelText(/current password/i, { selector: 'input' }), {
            target: { value: 'OldPass123!' },
        });
        fireEvent.change(screen.getByLabelText(/new password/i, { selector: 'input[name="newPassword"]' }), {
            target: { value: 'NewPass123!' },
        });
        fireEvent.change(screen.getByLabelText(/confirm new password/i, { selector: 'input' }), {
            target: { value: 'NewPass123!' },
        });

        fireEvent.click(screen.getByRole('button', { name: /change password/i }));

        await waitFor(() => {
            expect(mockChangePassword).toHaveBeenCalledTimes(1);
            expect(screen.getByText(/password changed successful!/i)).toBeInTheDocument();
        });
    });

    it('shows error for mismatched passwords', async () => {
        render(<ChangePassword />);

        fireEvent.change(screen.getByLabelText(/current password/i, { selector: 'input' }), {
            target: { value: 'OldPass123!' },
        });
        fireEvent.change(screen.getByLabelText(/new password/i, { selector: 'input[name="newPassword"]' }), {
            target: { value: 'NewPass123!' },
        });
        fireEvent.change(screen.getByLabelText(/confirm new password/i, { selector: 'input' }), {
            target: { value: 'WrongPass123!' },
        });

        fireEvent.click(screen.getByRole('button', { name: /change password/i }));

        expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
        expect(mockChangePassword).not.toHaveBeenCalled();
    });

    it('handles backend error', async () => {
        mockChangePassword.mockResolvedValueOnce({ status: 'error', message: 'Invalid current password' });

        render(<ChangePassword />);

        fireEvent.change(screen.getByLabelText(/current password/i, { selector: 'input' }), {
            target: { value: 'WrongPass123!' },
        });
        fireEvent.change(screen.getByLabelText(/new password/i, { selector: 'input[name="newPassword"]' }), {
            target: { value: 'NewPass123!' },
        });
        fireEvent.change(screen.getByLabelText(/confirm new password/i, { selector: 'input' }), {
            target: { value: 'NewPass123!' },
        });

        fireEvent.click(screen.getByRole('button', { name: /change password/i }));

        await waitFor(() => {
            expect(mockChangePassword).toHaveBeenCalled();
            expect(screen.getByText(/invalid current password/i)).toBeInTheDocument();
        });
    });
});
