import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App smoke test", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("shows login screen when unauthenticated user opens app", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /support insights/i }),
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument();
  });
});
