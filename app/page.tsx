import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "Video Speed Reader — Your video, in words.",
  description:
    "上傳影片，三分鐘內拿到逐字稿。Upload your video, get a clean transcript in three minutes.",
};

export default function Page() {
  return <Index />;
}
