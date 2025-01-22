"use client";

import React from "react";
import "./globals.css";
import { useRouter, usePathname } from "next/navigation";
import Providers from "@/lib/providers";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  // '/' 경로에서는 레이아웃 제외
  if (pathname === "/") {
    return (
      <html lang="en">
        <body className="bg-black text-white min-h-screen">
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  }

  // 다른 경로에서는 레이아웃 적용
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <Providers>
          <div className="flex flex-1">
            <aside className="w-60 p-4 flex flex-col gap-4 border-r border-gray-800">
              <h1 className="py-5 text-center text-3xl font-bold">
                CryptoValley
              </h1>
              <div className="flex flex-col gap-2 px-4 py-2 rounded">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded ${
                    pathname === "/home"
                      ? "bg-white text-black hover:bg-gray-200"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => router.push("/home")}
                >
                  <span>Home</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded ${
                    pathname === "/profile"
                      ? "bg-white text-black hover:bg-gray-200"
                      : "hover:bg-gray-800"
                  }`}
                  onClick={() => router.push("/profile")}
                >
                  <span>Profile</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
                  <span>Portfolio</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
                  <span>Community</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
                  <span>Reports</span>
                </button>
              </div>
            </aside>

            <main className="flex-1 p-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
