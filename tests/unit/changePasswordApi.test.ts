// changePasswordApi.test.ts
"use client";
import { changePassword } from "@/app/auth/change-password/changePasswordApi";

global.fetch = jest.fn(); // Mock the global fetch API

describe("changePassword", () => {
  const mockURL = "http://localhost:3000/api/auth/change-password";
  const mockModel = {
    currentPassword: "oldPassword123!",
    newPassword: "NewPass123!",
    newPasswordConfirm: "NewPass123!",
  };
  const mockToken = "mockUserToken";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return success response when the password is changed successfully", async () => {
    // Mocking fetch to return a successful response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: "Password changed!" }),
    });

    const result = await changePassword(mockModel, mockToken);

    expect(result).toEqual({
      status: "success",
      message: "Password Changed successful!",
    });

    // Check that fetch is called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(mockURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mockToken}`,
      },
      body: JSON.stringify(mockModel),
    });
  });

  it("should return error response with a specific message from the backend", async () => {
    // Mocking fetch to return an error from server
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        error: "Server error message",
      }),
    });

    const result = await changePassword(mockModel, mockToken);

    expect(result).toEqual({
      status: "error",
      message: "Server error message",
    });
  });

  it("should return a generic error message if the server doesn't provide an 'error' field", async () => {
    // Mocking fetch to return an error without an 'error' field
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({}),
    });

    const result = await changePassword(mockModel, mockToken);

    expect(result).toEqual({
      status: "error",
      message: "An error occurred during password change.",
    });
  });

  it("should return a network error message if the fetch call fails", async () => {
    // Mock fetch to reject (e.g., network error)
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await changePassword(mockModel, mockToken);

    expect(result).toEqual({
      status: "error",
      message: "Failed to connect to the change password function.",
    });
  });
});
