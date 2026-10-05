import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { AuthContext } from "@/lib/auth-context";
import { AppRoutes } from "@/AppRoutes";

vi.mock("@/integrations/supabase/client", () => ({ supabase: { auth: {} } }));

const fakeUser = { id: "u1", email: "me@example.com" } as never;

function renderAt(path: string, user: unknown = null) {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <AuthContext.Provider value={{ user: user as never, loading: false }}>
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    </QueryClientProvider>,
  );
}

describe("App routing", () => {
  it.each(["/", "/auth", "/sign-in", "/sign-up"])(
    "renders a page for %s instead of not found",
    (path) => {
      renderAt(path);
      expect(screen.queryByText("Page not found")).toBeNull();
    },
  );

  it("renders the workspace at /app for a signed-in user", () => {
    renderAt("/app", fakeUser);
    expect(screen.getByText("Hi me@example.com")).toBeInTheDocument();
  });

  it("redirects /app to sign-in when signed out", () => {
    renderAt("/app");
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  it("shows 404 for unknown paths", () => {
    renderAt("/nope");
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
