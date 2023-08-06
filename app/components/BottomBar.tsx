"use client";

import { navbarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 z-10 w-full rounded bg-gray-900 p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex flex-row items-center justify-center gap-5">
        {navbarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <div key={link.label}>
              <Link
                className={`relative flex justify-start gap-4 rounded-lg p-4 text-white ${
                  isActive && "bg-blue-500"
                }`}
                href={link.route}
              >
                <Image src={link.logo} height={20} width={20} alt="icon" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
