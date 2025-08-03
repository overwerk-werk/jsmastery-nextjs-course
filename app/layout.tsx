import type { Metadata } from "next";
import localFont from "next/font/local"; 
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ReactNode } from "react";


const inter = localFont({
  src: "./fonts/inter-VTF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/spaceGrotesk-VTF.ttf",
  variable: "--font-spaceGrotesk",
  weight: "300 400 500 600 700",
});



export const metadata: Metadata = {
  title: "DevFlow",
  description: "A community-driven platform and asking and asnwering programming questions. Get help, share knowledge, and collaborate with develpoers from around the world. Explore topics in web development, mobile app developments, algorithms, data structures, and more.",
  icons: {
    icon: '/image/site-logo.svg'
  }
};


const  RootLayout = async ({ children, }: { children: ReactNode }) => {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>

            <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
          
      </head>
      <SessionProvider session={session}>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange
        >
          {children}
          
        </ThemeProvider>
      <Toaster />

      </body>
      </SessionProvider>
    </html>
  );
}



export default RootLayout
