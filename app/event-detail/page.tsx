// File: tests/unit/Profile.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Profile from "@/app/profile/page"; // <-- Adjust path if needed
import "@testing-library/jest-dom";

// Mock environment variable (URL) if needed
process.env.NSC_EVENTS_PUBLIC_API_URL = "https://mock-api-url.com";

// Mock the next/navigation router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
}));

// Mock the useAuth hook
jest.mock("@/hooks/useAuth", () => {
  return jest.fn(() => ({
    isAuth: true, // Default to authenticated
  }));
});

// Mock the localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock the fetch call to retrieve user data
global.fetch = jest.fn();

// Mock sub-components
jest.mock("@/components/UnauthorizedPageMessage", () => {
  return jest.fn(() => <div>Unauthorized Page</div>);
});

jest.mock("@/components/CurrentUserCard", () => {
  return jest.fn(({ user }: { user: any }) => (
    <div data-testid="current-user-card">User: {user.firstName}</div>
  ));
});

jest.mock("@/components/EditUserDetailsDialog", () => ({
  __esModule: true,
  default: jest.fn(({ open }: { open: boolean }) =>
    open ? <div data-testid="edit-dialog">Edit Dialog</div> : null
  ),
}));

describe("Profile Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    (global.fetch as jest.Mock).mockReset();
  });

  it('shows "Please sign in to view profile." if no token is found in localStorage', async () => {
    // There's no token in localStorage
    // isAuth returns true, but we never set a token, so we check the code path:
    // if (token === null) => "Please sign in to view profile."

    await act(async () => {
      render(<Profile />);
    });

    expect(
      screen.getByText("Please sign in to view profile.")
    ).toBeInTheDocument();
  });

  it('shows "Loading..." initially if we DO have a token but no user data yet', async () => {
    // Simulate having a token
    localStorage.setItem("token", "dummy-jwt");

    // We haven't yet resolved fetch => user is undefined => "Loading..."
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => new Promise((res) => setTimeout(() => res({}), 100)), // delayed
      })
    );

    await act(async () => {
      render(<Profile />);
    });

    // We expect "Loading..." immediately
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Let fetch resolve
    await waitFor(() => {
      // After data is loaded, the user is empty, so it might show "Loading..." or proceed
      // This depends on how you handle the empty user response. 
      // In your real code, if user is empty => maybe "Loading..." is replaced with "No user found"
    });
  });

  it('shows "Welcome, John!" once user data is loaded and isAuth is true', async () => {
    // We have a token
    localStorage.setItem("token", "dummy-jwt");

    // Mock the fetch to return user data
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      }),
    } as Response);

    await act(async () => {
      render(<Profile />);
    });

    // Wait for the user to load
    await waitFor(() => {
      expect(screen.getByText("Welcome, John!")).toBeInTheDocument();
      expect(screen.getByTestId("current-user-card")).toHaveTextContent(
        "User: John"
      );
    });
  });

  it("shows UnauthorizedPageMessage if isAuth is false", async () => {
    // Because we do jest.mock("@/hooks/useAuth", ...),
    // we have to override the default return for this test:
    const useAuth = require("@/hooks/useAuth").default;
    useAuth.mockReturnValue({ isAuth: false });

    // We do have a token
    localStorage.setItem("token", "dummy-jwt");

    // Mock fetch, but won't matter since isAuth=false => unauthorized
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ firstName: "John" }),
    } as Response);

    await act(async () => {
      render(<Profile />);
    });

    // Renders <UnauthorizedPageMessage />
    expect(screen.getByText("Unauthorized Page")).toBeInTheDocument();
  });

  it("opens EditUserDetailsDialog when clicking 'Edit Profile'", async () => {
    // Setup token and user fetch
    localStorage.setItem("token", "dummy-jwt");
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        firstName: "John",
      }),
    } as Response);

    await act(async () => {
      render(<Profile />);
    });

    // Wait for the user to load
    await waitFor(() => {
      expect(screen.getByText("Welcome, John!")).toBeInTheDocument();
    });

    // Click "Edit Profile"
    fireEvent.click(screen.getByText("Edit Profile"));

    // The dialog is rendered
    expect(screen.getByTestId("edit-dialog")).toBeInTheDocument();
  });

  it("navigates to /auth/change-password when clicking 'Change Password'", async () => {
    // Mock router
    const { useRouter } = require("next/navigation");
    const mockReplace = jest.fn();
    useRouter.mockReturnValue({ replace: mockReplace });

    // Setup token and user fetch
    localStorage.setItem("token", "dummy-jwt");
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        firstName: "John",
      }),
    } as Response);

    await act(async () => {
      render(<Profile />);
    });

    // Wait for the user to load
    await waitFor(() => {
      expect(screen.getByText("Welcome, John!")).toBeInTheDocument();
    });

    // Click "Change Password"
    fireEvent.click(screen.getByText("Change Password"));

    expect(mockReplace).toHaveBeenCalledWith("/auth/change-password");
  });
});
