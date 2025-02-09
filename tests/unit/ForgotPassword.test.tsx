// tests/unit/ForgotPassword.test.tsx
"use client";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "@/app/auth/forgot-password/page"; // Adjust path as needed
import "@testing-library/jest-dom";

// Mock the global fetch API
global.fetch = jest.fn();

describe("ForgotPassword Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Optionally mock the environment variable if needed:
    // process.env.NSC_EVENTS_PUBLIC_API_URL = "http://example.com";
  });

  it("submits a valid email and displays success dialog", async () => {
    // 1. Mock a successful response from server
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
    });

    render(<ForgotPassword />);

    // 2. Fill in the email input
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });

    // 3. Click the Submit button
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // 4. Expect the correct fetch call
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NSC_EVENTS_PUBLIC_API_URL}/auth/forgot-password`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      })
    );

    // 5. Wait for the success dialog to appear
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(
        screen.getByText(/has been sent to your email address/i)
      ).toBeInTheDocument();
    });
  });

  it("submits an invalid email and displays error dialog", async () => {
    // 1. Mock a failing response from server
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    render(<ForgotPassword />);

    // 2. Fill in the email input
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "invalid@example.com" },
    });

    // 3. Click the Submit button
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // 4. Wait for the error dialog to appear
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(
        screen.getByText(/email address is invalid, please use a registered email/i)
      ).toBeInTheDocument();
    });
  });

  it("closes the dialog when OK is clicked", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });
    render(<ForgotPassword />);

    // Fill in and submit
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Ensure dialog is shown
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    // Click OK inside the dialog
    fireEvent.click(screen.getByRole("button", { name: /ok/i }));

    // The dialog should disappear
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
