"use client";

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { navbarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-gray-900 px-6 py-3">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assests/logo.png" alt="logo" width={60} height={60} />
      </Link>

      <div className="flex-row gap-8 items-center hidden md:flex">
        {navbarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <div key={link.label}>
              <Link
                className={`relative flex justify-start gap-4 rounded-lg p-4 ${
                  isActive && "bg-blue-500"
                }`}
                href={link.route}
              >
                <p>{link.label}</p>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1">
        <div className="items-center gap-5 flex-row flex">
          <div className="md:flex hidden gap-5">
            <SignedOut>
              <SignUpButton>
                <Button variant="secondary">Sign Up</Button>
              </SignUpButton>
              <SignInButton>
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>

          <div className="md:hidden flex">
            <SignedOut>
              <SignInButton>
                <LogIn />
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        <div className="flex flex-row items-center gap-5">
          <SignedIn>
            <Button variant="secondary">Add Recipe</Button>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <LogOut />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
