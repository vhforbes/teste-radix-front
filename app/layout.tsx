import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/ui/providers";
import ThemeSwitch from "@/components/ui/theme-switch";
import { Header } from "@/components/header";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teste Globo",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  console.log(session);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <main>
            <Header session={session} />
            {children}
          </main>
          <Toaster expand={false} richColors />
        </Providers>
      </body>
    </html>
  );
}
