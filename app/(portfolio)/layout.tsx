import type { Metadata } from "next";
import "../globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Ana Alexandria - PFC",
  description: "Ana Alexandria - PFC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          {/* Mantive a sua antiga div espaçadora caso tenha uso estrutural, 
              mas pode ser deletada se não houver um componente nela */}
          <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-0">
            <div className="w-10 h-10 md:w-12 md:h-12"></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
