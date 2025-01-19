'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // @ts-ignore - ethereum이 window 객체에 있다고 가정
      const ethereum = window.ethereum;

      if (!ethereum) {
        alert('MetaMask를 설치해주세요!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {

        router.push('/profile');
      }
    } catch (error) {
      console.error('지갑 연결 오류:', error);
      alert('지갑 연결에 실패했습니다.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-gray-900 flex items-center">
        <div className="text-lg font-bold">Crypto Valley</div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Welcome to CryptoValley</h1>
        <p className="text-gray-400 mb-6 text-center">
          CryptoValley is a place to search chart information
        </p>

        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-64 h-12 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Connect with MetaMask'}
        </button>

        <p className="text-gray-500 text-sm mt-4 text-center">
          By connecting you agree to the CryptoValley of service and privacy policy
        </p>
      </main>
    </div>
  );
}


Page.getLayout = function PageLayout(page: React.ReactNode){
  return <>{page}</>;
};