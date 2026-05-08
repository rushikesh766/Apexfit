import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APEXFIT - Gym Management OS",
  description: "A premium mobile-first gym management app for owners, trainers, and members.",
  manifest: "/manifest.json",
  applicationName: "APEXFIT",
  appleWebApp: {
    capable: true,
    title: "APEXFIT",
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: "/icons/apexfit-icon.svg",
    apple: "/icons/apexfit-icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0d0f"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
