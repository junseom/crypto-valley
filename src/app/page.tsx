"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

export default function Page() {
  const router = useRouter();
  const { setShowAuthFlow } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();

  const handleWalletConnect = () => {
    if (isLoggedIn) {
      router.push("/home");
    } else {
      setShowAuthFlow(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex flex-col items-center px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Welcome to CryptoValley</h1>
        <p className="text-gray-400 mb-6 text-center">
          CryptoValley is a place to search chart information
        </p>

        <button
          onClick={handleWalletConnect}
          className="w-64 h-12 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          Connect wallet
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
