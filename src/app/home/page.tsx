'use client';

import React from "react";
import { useRouter } from "next/navigation";

// Token 타입 정의
interface Token {
  name: string;
  amount: string;
  value: string;
  icon: string;
  hasAccess: boolean;
}

const TokenListPage = () => {
  const router = useRouter();

  const tokens: Token[] = [
    { name: "Bitcoin", amount: "0.1 BTC", value: "$6,000", icon: "/icons/bitcoin.png", hasAccess: true },
    { name: "Ethereum", amount: "0.1 ETH", value: "$3,000", icon: "/icons/ethereum.png", hasAccess: true },
    { name: "CryptoVest Token", amount: "0.1 CVT", value: "$3,000", icon: "/icons/cryptovest.png", hasAccess: false },
    { name: "Dogecoin", amount: "0.1 DOGE", value: "$3,000", icon: "/icons/dogecoin.png", hasAccess: false },
    { name: "Cardano", amount: "0.1 ADA", value: "$3,000", icon: "/icons/cardano.png", hasAccess: false },
    { name: "Solana", amount: "0.1 SOL", value: "$3,000", icon: "/icons/solana.png", hasAccess: false },
  ];

  const handleTokenClick = (token: Token) => {
    if (token.name === "Bitcoin") {
      router.push("/chart/bitcoin");
    } else if (token.name === "Ethereum") {
      router.push("/chart/ethereum");
    } else if (!token.hasAccess) {
      router.push("/purchase");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Token lists</h1>
        <button className="bg-gray-800 px-4 py-2 rounded text-gray-300 hover:bg-gray-700">
          View Token Balance
        </button>
      </div>
      <ul className="space-y-4">
        {tokens.map((token) => (
          <li
            key={token.name}
            className={`flex items-center gap-4 px-6 py-4 rounded cursor-pointer ${
              token.hasAccess ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-800"
            }`}
            onClick={() => handleTokenClick(token)}
          >
            <img src={token.icon} alt={token.name} className="w-10 h-10 rounded" />
            <div>
              <h3 className="font-medium">{token.name}</h3>
              <p className="text-sm text-gray-400">
                {token.amount}, {token.value}
              </p>
              {!token.hasAccess && (
                <p className="text-sm text-red-500">Access required</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenListPage;
