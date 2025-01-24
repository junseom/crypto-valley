'use client';

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { newsData } from "@/states/mock-news.data";
import { useOpinions } from "@/states/opinions.state";

const DynamicChartPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const symbol = pathname.split("/").pop()?.toUpperCase();
  const opinions = useOpinions();

  // Binance 심볼 매핑
  const symbolMapping: { [key: string]: string } = {
    BITCOIN: "BINANCE:BTCUSDT",
    ETHEREUM: "BINANCE:ETHUSDT",
    DOGECOIN: "BINANCE:DOGEUSDT",
  };

  const tradingViewSymbol = symbolMapping[symbol || "BITCOIN"] || "BINANCE:BTCUSDT";

  useEffect(() => {
    const widgetContainer = document.getElementById("tradingview_widget");
    if (widgetContainer) {
      widgetContainer.innerHTML = ""; // 위젯 초기화
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new (window as any).TradingView.widget({
        container_id: "tradingview_widget",
        width: "100%",
        height: "100%",
        symbol: tradingViewSymbol,
        interval: "D",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        hide_side_toolbar: false,
      });
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [tradingViewSymbol]);

  return (
    <div className="flex flex-row h-screen bg-black text-white">
      {/* Left: Timeline */}
      <div className="w-1/4 p-4 bg-gray-900 overflow-auto">
        <h2 className="text-lg font-bold mb-4">News</h2>
        <ul className="space-y-4">
          {newsData.map((item, index) => (
            <li key={index} className="p-4 bg-gray-800 rounded">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.content}</p>
              <p className="text-sm text-gray-400">{item.date}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Center: Chart */}
      <div className="w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4">{symbol} Chart</h1>
        <div id="tradingview_widget" className="w-full h-full" />
      </div>

      {/* Right: Information Panel */}
      <div className="w-1/4 p-4 bg-gray-900 overflow-auto">
        <h2 className="text-lg font-bold mb-4">Opinion</h2>
        <ul className="space-y-4">
          {(opinions) ? (opinions.map((info, index) => (
            <li key={index} className="p-4 bg-gray-800 rounded">
              <h3 className="font-semibold">{info.effect}</h3>
              <p className="text-sm text-gray-400">{info.cause}</p>
              <p className="text-sm text-gray-500">Source: {info.link}</p>
              <button
                className="mt-2 text-sm text-blue-400 hover:underline"
                onClick={() => router.push("/information")} // 버튼 클릭 시 /information으로 이동
              >
                Validate
              </button>
            </li>
          ))): null}:
        </ul>
        <button
          className="mt-4 w-full p-2 bg-blue-500 rounded text-white hover:bg-blue-600"
          onClick={() => router.push("/submit")}
        >
          Submit New Opinion
        </button>
      </div>
    </div>
  );
};

export default DynamicChartPage;
