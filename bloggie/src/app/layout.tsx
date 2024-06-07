import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import ThemeProvider from '@/theme/ThemeProvider.tsx'
import NavBar from '@/universal/NavBar'
import { AuthContextProvider } from '@/context/AuthContext';
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const inter = Kanit({ subsets: ["latin"] , weight: "400"});

export const metadata: Metadata = {
  title: "f. Blog",
  description: "Blogging for smart, creative Bloggers!",
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
