import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-black text-white`}>
          <Navbar />
          <main className="flex flex-row">
            <section className="">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            {/* @ts-ignore */}
          </main>

          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
