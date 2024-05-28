import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ThemeProvider from '@/theme/ThemeProvider.tsx'
import NavBar from '@/universal/NavBar'
import { AuthContextProvider } from '@/context/AuthContext';
import "./globals.css";

const inter = Roboto({ subsets: ["latin"] , weight: "400"});

export const metadata: Metadata = {
  title: "Firevisual ",
  description: "All in one solution visualizing Firestore.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" />
      <body className={inter.className}>
        <AuthContextProvider>
          <NavBar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
