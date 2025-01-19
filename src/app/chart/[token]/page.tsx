'use client';

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const DynamicChartPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const symbol = pathname.split("/").pop()?.toUpperCase();

  // Binance 심볼 매핑
  const symbolMapping: { [key: string]: string } = {
    BITCOIN: "BINANCE:BTCUSDT",
    ETHEREUM: "BINANCE:ETHUSDT",
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

  const timelineData = [
    { title: "Crypto exchange Binance under investigation by the CFTC", time: "4 hours ago", validate: true },
    { title: "El Salvador buys the dip, adding 150 Bitcoins to its treasury", time: "3 hours ago", validate: false },
  ];

  const informationPanelData = [
    { title: "Bitcoin protocol 0.7 released with client support for OP_EVAL opcode", date: "Nov 28, 2012", source: "The Guardian" },
    { title: "First major theft of Bitcoin. 25,000 BTC stolen.", date: "June 12, 2011", source: "Wired" },
    { title: "Laszlo Hanyecz buys two pizzas for 10,000 BTC", date: "May 22, 2010", source: "Laszlo Hanyecz" },
    { title: "First documented purchase using Bitcoin", date: "Aug 15, 2010", source: "Bitcoin Wiki" },
    { title: "Satoshi Nakamoto mines the genesis block", date: "Jan 3, 2009", source: "Bitcoin Genesis Block" },
  ];

  return (
    <div className="flex flex-row h-screen bg-black text-white">
      {/* Left: Timeline */}
      <div className="w-1/4 p-4 bg-gray-900 overflow-auto">
        <h2 className="text-lg font-bold mb-4">Timeline</h2>
        <ul className="space-y-4">
          {timelineData.map((item, index) => (
            <li key={index} className="p-4 bg-gray-800 rounded">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.time}</p>
              <button
                className="mt-2 text-sm text-blue-400 hover:underline"
                onClick={() => router.push("/information")} // 버튼 클릭 시 /information으로 이동
              >
                {item.validate ? "Validate" : "Validate"}
              </button>
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
        <h2 className="text-lg font-bold mb-4">Information Panel</h2>
        <ul className="space-y-4">
          {informationPanelData.map((info, index) => (
            <li key={index} className="p-4 bg-gray-800 rounded">
              <h3 className="font-semibold">{info.title}</h3>
              <p className="text-sm text-gray-400">{info.date}</p>
              <p className="text-sm text-gray-500">Source: {info.source}</p>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 w-full p-2 bg-blue-500 rounded text-white hover:bg-blue-600"
          onClick={() => router.push("/submit")} // 버튼 클릭 시 /submit으로 이동
        >
          Submit New Information
        </button>
      </div>
    </div>
  );
};

export default DynamicChartPage;
