import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/auth/login/page";

const mockSignInWithOAuth = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
    },
  })),
}));

describe("Login page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignInWithOAuth.mockResolvedValue({ error: null });
  });

  it("renders Sign in with Google button", () => {
    render(<LoginPage />);
    const buttons = screen.getAllByRole("button", { name: /sign in with google/i });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("calls signInWithOAuth with provider google and redirectTo containing /auth/callback on button click", async () => {
    render(<LoginPage />);
    const buttons = screen.getAllByRole("button", { name: /sign in with google/i });
    fireEvent.click(buttons[0]);
    await waitFor(() => {
      expect(mockSignInWithOAuth).toHaveBeenCalledTimes(1);
    });
    expect(mockSignInWithOAuth).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: "google",
        options: expect.objectContaining({
          redirectTo: expect.stringMatching(/\/auth\/callback/),
        }),
      })
    );
  });
});
