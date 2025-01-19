import React from "react";

const PurchasePage = () => {
  return (
    <div className="flex items-center text-white">
      <div className="p-8 gap-5 rounded-lg w-full max-w-4xl h-full flex flex-col">
        {/* 제목과 설명 */}
        <div className="flex-grow">
          <h1 className="text-2xl font-semibold mb-4">Unlock detailed charts</h1>
          <p className="text-gray-300 mb-6">
            Get access to our in-depth charting tools by purchasing $1,000 CV Tokens
          </p>

          {/* Token Balance Section */}
          <div className="flex items-center gap-4 bg-gray-800 p-4 rounded mb-4">
            <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center">
              <img src="/icons/token-balance.png" alt="Token Balance" className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Token Balance</h3>
              <p className="text-sm text-gray-400">Your current balance is 0 CV Tokens</p>
              <p className="text-xs text-gray-500">
                You will be charged 1,000 $CV Token<br />
                Subscription Period: 24.09.01 ~ 24.10.01
              </p>
            </div>
          </div>

          {/* Chart Access Section */}
          <div className="flex items-center gap-4 bg-gray-800 p-4 rounded">
            <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center">
              <img src="/icons/chart-access.png" alt="Chart Access" className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Chart Access</h3>
              <p className="text-sm text-gray-400">
                This will unlock detailed charts for 1 year
              </p>
            </div>
          </div>
        </div>

        {/* Confirm Purchase Button */}
        <div className="flex-shrink-0">
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded">
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
