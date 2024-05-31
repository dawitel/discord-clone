import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import {cn} from  "@/lib/utils"
const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Discord | Fullstack discord clone made by Dawit Elias, a junior fullstack dev",
  description: "Fullstack discord clone by Dawit Elias, a junior fullstack dev",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning   >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="discord-theme"
          disableTransitionOnChange
        >
          <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>{children}</body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
