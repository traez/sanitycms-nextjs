import type { Metadata } from "next";
import "./globals.css";
import NextJsTopLoader from "@/lib/NextJsTopLoader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sanity CMS - Next.js",
  description: "Created by Trae Zeeofor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col justify-center items-center min-h-screen w-full font-trebuchetMs">
        <NextJsTopLoader />
        <Header />
        <main className="flex-grow h-full w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
