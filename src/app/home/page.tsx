"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSigner } from "@dynamic-labs/ethers-v6";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { CV__factory } from "@/typechain";
import SEPOLIA_CONTRACTS from "@/configs/sepolia";
import { parseUnits } from "ethers/utils";

interface Token {
  name: string;
  symbol: string;
  amount: string;
  value: string;
  icon: string;
  hasAccess: boolean;
}

const TokenListPage = () => {
  const router = useRouter();
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { primaryWallet } = useDynamicContext();

  const [tokens, setTokens] = useState<Token[]>([
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "0.1 BTC",
      value: "2",
      icon: "/icons/bitcoin.png",
      hasAccess: true,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: "0.1 ETH",
      value: "2",
      icon: "/icons/ethereum.png",
      hasAccess: true,
    },
    {
      name: "XRPL",
      symbol: "XRP",
      amount: "0.1 CVT",
      value: "2",
      icon: "/icons/cryptovest.png",
      hasAccess: false,
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      amount: "0.1 DOGE",
      value: "2",
      icon: "/icons/dogecoin.png",
      hasAccess: false,
    },
    {
      name: "Solana",
      symbol: "SOL",
      amount: "0.1 SOL",
      value: "2",
      icon: "/icons/solana.png",
      hasAccess: false,
    },
    {
      name: "Cardano",
      symbol: "ADA",
      amount: "0.1 ADA",
      value: "2",
      icon: "/icons/cardano.png",
      hasAccess: false,
    },
  ]);

  const handleTokenClick = (token: Token) => {
    if (token.hasAccess) {
      router.push(`/chart/${token.name}`);
    } else {
      setSelectedToken(token);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedToken(null);
    setIsApproved(false);
  };

  const onApprove = async () => {
    const signer = await getSigner(primaryWallet!);

    const cv = CV__factory.connect(
      SEPOLIA_CONTRACTS.CV,
      signer,
    );
    const tx = await cv.approve(SEPOLIA_CONTRACTS.CV, parseUnits(selectedToken!.value, 6));
    await tx.wait();
    setIsApproved(true);
  };

  const onConfirm = async () => {
    const signer = await getSigner(primaryWallet!);

    const cv = CV__factory.connect(
      SEPOLIA_CONTRACTS.CV,
      signer,
    );

    const tx = await cv.subscribe(selectedToken!.symbol);
    await tx.wait();
    setTokens((prevTokens) =>
      prevTokens.map((token) =>
        token.name === selectedToken!.name
          ? { ...token, hasAccess: true }
          : token
      )
    );

    closeModal();
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
            <img
              src={token.icon}
              alt={token.name}
              className="w-10 h-10 rounded"
            />
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

      {/* 모달 */}
      {isModalOpen && selectedToken && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="absolute bg-gray-900 p-8 rounded shadow-lg max-w-2xl w-full"
            style={{ top: "10%" }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Unlock detailed charts
            </h2>
            <p className="text-gray-400 mb-4">
              Get access to our in-depth charting tools by purchasing $1,000 CV
              Tokens.
            </p>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-800 p-4 rounded">
                  <img
                    src="/icons/wallet.png"
                    alt="Wallet Icon"
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <p className="text-gray-300">Token Balance</p>
                  <p className="text-sm text-gray-400">
                    Your current balance is 0 CV Tokens
                  </p>
                  <p className="text-sm text-gray-500">
                    You will be charged 1,000 $CV Token
                  </p>
                  <p className="text-sm text-gray-500">
                    Subscription Period: 24.09.01 ~ 24.10.01
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-gray-800 p-4 rounded">
                  <img
                    src="/icons/lock.png"
                    alt="Lock Icon"
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <p className="text-gray-300">Chart Access</p>
                  <p className="text-sm text-gray-400">
                    This will unlock detailed charts for 1 year
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-8 justify-evenly">
              <button
                className="bg-gray-800 px-4 py-2 w-full rounded text-gray-300 hover:bg-gray-700"
                onClick={closeModal}
              >
                Close
              </button>
              {!isApproved ? (
                <button
                  className="bg-white px-4 py-2 w-full rounded text-black hover:bg-gray-200"
                  onClick={onApprove}
                >
                  Approve Purchase
                </button>
              ) : (
                <button
                  className="bg-blue-500 px-4 py-2 w-full rounded text-white hover:bg-gray-200"
                  onClick={onConfirm}
                >
                  Confirm Purchase
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenListPage;
