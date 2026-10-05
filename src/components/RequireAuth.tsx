import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";

// Client-side guard for authenticated pages (replaces the old _authenticated layout).
export function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;
  return <Outlet />;
}
