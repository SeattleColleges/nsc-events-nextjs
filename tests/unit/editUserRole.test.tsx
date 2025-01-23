import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import EditUserRolePage from "../../app/edit-user-role-page/page";
import useAuth from "@/hooks/useAuth";
import UserTable from "@/app/edit-user-role-page/components/UserTable"; // Import the new UserTable component

// Mock the useAuth hook
jest.mock("@/hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the UserTable component
jest.mock("@/components/UserTable", () => ({ userInfo, handleCloseDialog }: any) => (
  <div data-testid="user-table">
    {userInfo.data.map((user: any) => (
      <div key={user.id} data-testid="user-row">
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p>{user.email}</p>
        <p>{user.role}</p>
      </div>
    ))}
  </div>
));

describe("EditUserRolePage", () => {
  beforeEach(() => {
    // Mock the fetch API
    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: "65f746226a9e5ccd0c0a6052",
              firstName: "user",
              lastName: "user",
              email: "user@gmail.com",
              role: "creator",
            },
            {
              id: "65f7462a6a9e5ccd0c0a6055",
              firstName: "user",
              lastName: "user",
              email: "admin@gmail.com",
              role: "admin",
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test 1: Render the page title
  it("renders the page title", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      user: { role: "admin" },
    });

    await act(async () => {
      render(<EditUserRolePage />);
    });

    const title = screen.getByText("User Management");
    expect(title).toBeInTheDocument();
  });

  // Test 2: Fetch and display user information in UserTable
  it("fetches and displays user information in UserTable", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      user: { role: "admin" },
    });

    await act(async () => {
      render(<EditUserRolePage />);
    });

    // Wait for the data to be loaded and displayed
    await waitFor(() => {
      const userRows = screen.getAllByTestId("user-row");
      expect(userRows).toHaveLength(2); // Check if there are 2 user rows
    });
  });

  // Test 3: Ensure the data in UserTable is correct
  it("displays correct user data in the UserTable", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      user: { role: "admin" },
    });

    await act(async () => {
      render(<EditUserRolePage />);
    });

    // Wait for the data to be loaded
    await waitFor(() => {
      const userRows = screen.getAllByTestId("user-row");
      expect(userRows[0]).toHaveTextContent("user user");
      expect(userRows[0]).toHaveTextContent("user@gmail.com");
      expect(userRows[0]).toHaveTextContent("creator");

      expect(userRows[1]).toHaveTextContent("user user");
      expect(userRows[1]).toHaveTextContent("admin@gmail.com");
      expect(userRows[1]).toHaveTextContent("admin");
    });
  });
});
