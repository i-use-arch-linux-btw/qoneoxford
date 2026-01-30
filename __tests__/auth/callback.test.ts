import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockExchangeCodeForSession = vi.fn();
const mockCreateClient = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: () => mockCreateClient(),
}));

async function getCallbackResponse(url: string, headers?: HeadersInit): Promise<Response> {
  const { GET } = await import("@/app/auth/callback/route");
  const request = new Request(url, { headers: headers ?? {} });
  return GET(request);
}

describe("auth/callback GET", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("NODE_ENV", "development");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("redirects to /auth/auth-code-error when code is missing", async () => {
    const res = await getCallbackResponse("https://example.com/auth/callback");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/auth/auth-code-error");
    expect(mockCreateClient).not.toHaveBeenCalled();
  });

  it("redirects to /auth/auth-code-error when code is present but createClient returns null", async () => {
    mockCreateClient.mockResolvedValue(null);
    const res = await getCallbackResponse("https://example.com/auth/callback?code=abc");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/auth/auth-code-error");
    expect(mockCreateClient).toHaveBeenCalled();
  });

  it("redirects to /auth/auth-code-error when exchangeCodeForSession returns error", async () => {
    mockCreateClient.mockResolvedValue({
      auth: {
        exchangeCodeForSession: mockExchangeCodeForSession.mockResolvedValue({
          error: new Error("invalid code"),
        }),
      },
    });
    const res = await getCallbackResponse("https://example.com/auth/callback?code=bad");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/auth/auth-code-error");
    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("bad");
  });

  it("redirects to / when code is valid and exchange succeeds", async () => {
    mockCreateClient.mockResolvedValue({
      auth: {
        exchangeCodeForSession: mockExchangeCodeForSession.mockResolvedValue({ error: null }),
      },
    });
    const res = await getCallbackResponse("https://example.com/auth/callback?code=valid");
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://example.com/");
    expect(mockExchangeCodeForSession).toHaveBeenCalledWith("valid");
  });

  it("redirects to next param when provided and valid path", async () => {
    mockCreateClient.mockResolvedValue({
      auth: {
        exchangeCodeForSession: mockExchangeCodeForSession.mockResolvedValue({ error: null }),
      },
    });
    const res = await getCallbackResponse(
      "https://example.com/auth/callback?code=valid&next=/dashboard"
    );
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://example.com/dashboard");
  });

  it("redirects to / when next is not a path", async () => {
    mockCreateClient.mockResolvedValue({
      auth: {
        exchangeCodeForSession: mockExchangeCodeForSession.mockResolvedValue({ error: null }),
      },
    });
    const res = await getCallbackResponse(
      "https://example.com/auth/callback?code=valid&next=https://evil.com"
    );
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://example.com/");
  });
});
