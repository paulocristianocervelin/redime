import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/lib/bigint-helper"; // Importa globalmente para configurar BigInt.prototype.toJSON
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Missão Redime Chapecó - Amor, Verdade, Mesa & Discipulado",
  keywords: ["igreja", "cristianismo", "adoração", "oração", "comunidade", "redime", "chapecó", "missão", "discipulado"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
