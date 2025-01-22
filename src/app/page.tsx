"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

export default function Page() {
  const router = useRouter();
  const { setShowAuthFlow } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();

  const handleWalletConnect = () => {
    if (!isLoggedIn) {
      setShowAuthFlow(true);
    }
    router.push("/home");
  };

  return (
    <div
      className="min-h-screen bg-black bg-cover bg-center"
      style={{
        backgroundImage: "url('/chart.jpg')",
      }}
    >
      <main className="flex flex-col gap-2 items-center px-6 py-32">
        <h1 className="text-5xl font-bold mb-4">Welcome to CryptoValley</h1>
        <p className="text-gray-400 mb-6 text-xl text-center">
          CryptoValley is a place to search chart information
        </p>

        <button
          onClick={handleWalletConnect}
          className="w-64 h-12 bg-white text-black font-semibold text-black rounded-lg hover:bg-gray-300"
        >
          Login with Wallet
        </button>

        <p className="text-gray-500 text-sm mt-4 text-center">
          By connecting you agree to the CryptoValley of service and privacy
          policy
        </p>
      </main>
    </div>
  );
}

Page.getLayout = function PageLayout(page: React.ReactNode) {
  return <>{page}</>;
};
