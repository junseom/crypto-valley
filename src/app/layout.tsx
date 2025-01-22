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
          {/* Main Layout: Sidebar and Content */}
          <div className="flex flex-1">
            <aside className="w-60 p-4 flex flex-col gap-4 border-r border-gray-800">
              <h1 className="py-5 text-center text-3xl font-bold">
                CryptoValley
              </h1>
              <div className="flex flex-col gap-2 px-4 py-2 rounded text-gray-300">
                <button
                  className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded text-gray-300 hover:bg-gray-700"
                  onClick={() => router.push("/home")} // "Home" 버튼 클릭 시 /home으로 이동
                >
                  <span>Home</span>
                </button>
                <button
                  className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded text-gray-300 hover:bg-gray-700"
                  onClick={() => router.push("/profile")} // "Account" 버튼 클릭 시 /profile로 이동
                >
                  <span>Account</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
                  <span>My Coins</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
                  <span>Dashboard</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
                  <span>Explore</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
                  <span>Data</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
                  <span>Reports</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
                  <span>API</span>
                </button>
                <button
                 className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded"
                 >
                  <span>Log Out</span>
                </button>
              </div>
            </aside>

            {/* Page Content */}
            <main className="flex-1 p-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
