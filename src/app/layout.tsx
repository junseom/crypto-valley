'use client';

import React from "react";
import "./globals.css";
import { useRouter, usePathname } from "next/navigation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  // '/' 경로에서는 레이아웃 제외
  if (pathname === "/") {
    return (
      <html lang="en">
        <body className="bg-black text-white min-h-screen">
          {children}
        </body>
      </html>
    );
  }

  // 다른 경로에서는 레이아웃 적용
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => router.push("/home")} // "Coinverse" 클릭 시 /home으로 이동
          >
            <img
              src="/icons/logo.png" // 이미지 경로 변경
              alt="Logo"
              className="w-6 h-6"
            />
            <h1 className="text-lg font-semibold">Crypto-valley</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-6 text-gray-300">
              <a href="#" className="hover:text-white">Dashboard</a>
              <a href="#" className="hover:text-white">Explore</a>
              <a href="#" className="hover:text-white">Data</a>
              <a href="#" className="hover:text-white">Reports</a>
              <a href="#" className="hover:text-white">API</a>
              <a href="#" className="hover:text-white">Docs</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="text-gray-300 hover:text-white">🔔</button>
              <button className="text-gray-300 hover:text-white">⚙️</button>
              <img
                src="/icons/user-avatar.png" // 이미지 경로 변경
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Main Layout: Sidebar and Content */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-60 p-4 flex flex-col gap-4 border-r border-gray-800">
            <button
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded text-gray-300 hover:bg-gray-700"
              onClick={() => router.push("/profile")} // "Account" 버튼 클릭 시 /profile로 이동
            >
              <img
                src="/icons/account.png" // 이미지 경로 변경
                alt="Account"
                className="w-6 h-6"
              />
              <span>Account</span>
            </button>
            <button className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded">
              <img
                src="/icons/my-coins.png" // 이미지 경로 변경
                alt="My Coins"
                className="w-6 h-6"
              />
              <span>My Coins</span>
            </button>
          </aside>

          {/* Page Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
