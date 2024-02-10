import type { Metadata } from "next";
import { Inter } from "next/font/google";
import InstantSearchLayout from "@/components/InstantSearchLayout/InstantSearchLayout";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meilisearch E-Commerce",
  description: "Meilisearch Ecommerce demo for scalability and extensibility",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <InstantSearchLayout>
          {children}
        </InstantSearchLayout>
      </body>
    </html>
  );
}
