import "@testing-library/jest-dom";
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import EditUserRolePage from "../../app/edit-user-role-page/page";
import useAuth from "@/hooks/useAuth";

jest.mock("@/hooks/useAuth");

// Test rendering the User Management title for admin users
describe("EditUserRolePage", () => {
  it("renders the User Management title for admin users", () => {
    // Mock the auth hook to simulate an authenticated admin user
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      user: { role: "admin" },
    });

    render(<EditUserRolePage />);

    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
  });
});

// Test the searchParams state update when typing in search fields
describe("EditUserRolePage", () => {
  it("updates searchParams when typing in search fields", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      user: { role: "admin" },
    });

    render(<EditUserRolePage />);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    act(() => {
      fireEvent.change(firstNameInput, { target: { value: "John" } });
    });

    await waitFor(() => {
      expect(firstNameInput).toHaveValue("John");
    });

    act(() => {
      fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    });

    await waitFor(() => {
      expect(lastNameInput).toHaveValue("Doe");
    });

    act(() => {
      fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    });

    await waitFor(() => {
      expect(emailInput).toHaveValue("john.doe@example.com");
    });
  });
});
