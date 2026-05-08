import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APEXFIT - Premium Gym Management Software",
  description: "The all-in-one gym management platform for owners, trainers, and members. Track attendance, manage memberships, and grow your fitness business.",
  manifest: "/manifest.json",
  applicationName: "APEXFIT",
  appleWebApp: {
    capable: true,
    title: "APEXFIT",
    statusBarStyle: "default"
  },
  icons: {
    icon: "/icons/apexfit-icon.svg",
    apple: "/icons/apexfit-icon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#ffffff"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-white">
      <body>{children}</body>
    </html>
  );
}
