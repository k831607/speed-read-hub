import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Speed Reader — Your video, in words.",
  description:
    "上傳影片，三分鐘內拿到逐字稿。Upload your video, get a clean transcript in three minutes.",
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: "Video Speed Reader", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Same font the M0 stylesheet uses (Inter via Google Fonts). */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
