import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { NotFound } from "./components/NotFound";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AppPage from "./pages/AppPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<SignIn />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route element={<RequireAuth />}>
        <Route path="/app" element={<AppPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
