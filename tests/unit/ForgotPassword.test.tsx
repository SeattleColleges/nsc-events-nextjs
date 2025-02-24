import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "@/app/auth/forgot-password/page"; // Adjust path if necessary
import { createTheme, ThemeProvider } from "@mui/material/styles";

describe("ForgotPassword", () => {
  // Create a basic MUI theme to wrap the component
  const theme = createTheme();

  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  test("shows success message on valid email submission", async () => {
    // Mock fetch to return a successful response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    render(
      <ThemeProvider theme={theme}>
        <ForgotPassword />
      </ThemeProvider>
    );

    // Get the email input field by its label text
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Get and click the submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Wait for the dialog to open (which happens after form submission)
    await waitFor(() => {
      // If the fetch was successful, the dialog title should be "Success"
      const titleElement = screen.getByText("Success");
      expect(titleElement).not.toBeNull();
    });

    // Verify that the correct success message is displayed in the dialog
    const messageElement = screen.getByText(
      "An email with a password reset link has been sent to your email address."
    );
    expect(messageElement).not.toBeNull();
    expect(messageElement.textContent).toEqual(
      "An email with a password reset link has been sent to your email address."
    );
  });

  test("shows error message on invalid email submission", async () => {
    // Mock fetch to return a failed response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(
      <ThemeProvider theme={theme}>
        <ForgotPassword />
      </ThemeProvider>
    );

    // Get the email input field and enter a value
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: "invalid@example.com" } });

    // Click the submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Wait for the dialog to appear (after submission)
    await waitFor(() => {
      // With an error response, the dialog title should be "Error"
      const titleElement = screen.getByText("Error");
      expect(titleElement).not.toBeNull();
    });

    // Verify that the correct error message is displayed in the dialog
    const messageElement = screen.getByText(
      "Email address is invalid, please use a registered email address."
    );
    expect(messageElement).not.toBeNull();
    expect(messageElement.textContent).toEqual(
      "Email address is invalid, please use a registered email address."
    );
  });
});
