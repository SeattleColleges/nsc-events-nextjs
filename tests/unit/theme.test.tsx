import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeContextProvider, { useThemeContext } from "../../app/theme/providers";

const Consumer = () => {
  const { mode, toggleTheme } = useThemeContext();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe("ThemeContextProvider", () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders children after mounting", async () => {
    const Child = () => <div data-testid="child">Child Content</div>;

    render(
      <ThemeContextProvider>
        <Child />
      </ThemeContextProvider>
    );

    // Using findByTestId returns a promise that resolves to the element or throws if not found
    const child = await screen.findByTestId("child");
    // Check that the child exists and has the correct text content
    expect(child).not.toBeNull();
    expect(child.textContent).toEqual("Child Content");
  });

  test("initializes theme mode from localStorage", async () => {
    // Set the initial theme in localStorage to "dark"
    localStorage.setItem("theme", "dark");

    const TextConsumer = () => {
      const { mode } = useThemeContext();
      return <div>Current mode: {mode}</div>;
    };

    render(
      <ThemeContextProvider>
        <TextConsumer />
      </ThemeContextProvider>
    );

    const element = await screen.findByText("Current mode: dark");
    // Check that the element exists and the text content is as expected
    expect(element).not.toBeNull();
    expect(element.textContent).toEqual("Current mode: dark");
  });

  test("toggleTheme toggles the theme mode and updates localStorage", async () => {
    render(
      <ThemeContextProvider>
        <Consumer />
      </ThemeContextProvider>
    );

    // Wait for the initial mode element
    const modeElement = await screen.findByTestId("mode");
    // Assert the initial mode is "light" by checking its textContent
    expect(modeElement.textContent).toEqual("light");

    // Toggle to dark
    const toggleButton = screen.getByText("Toggle");
    fireEvent.click(toggleButton);

    const modeAfterToggle = await screen.findByTestId("mode");
    expect(modeAfterToggle.textContent).toEqual("dark");
    expect(localStorage.getItem("theme")).toEqual("dark");

    // Toggle back to light
    fireEvent.click(toggleButton);
    const modeAfterSecondToggle = await screen.findByTestId("mode");
    expect(modeAfterSecondToggle.textContent).toEqual("light");
    expect(localStorage.getItem("theme")).toEqual("light");
  });
});
