import type { Metadata } from "next";
import { NotFound } from "@/components/NotFound";

export const metadata: Metadata = {
  title: "Page not found — Video Speed Reader",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFoundPage() {
  return <NotFound />;
}
