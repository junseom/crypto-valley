"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { newsData } from "@/states/mock-news.data";
import { useOpinions } from "@/states/opinions.state";

const DynamicChartPage = () => {
  const pathname = usePathname();
  const symbol = pathname.split("/").pop()?.toUpperCase();
  const opinions = useOpinions();
  const router = useRouter();

  // Binance 심볼 매핑
  const symbolMapping: { [key: string]: string } = {
    BITCOIN: "BINANCE:BTCUSDT",
    ETHEREUM: "BINANCE:ETHUSDT",
    DOGECOIN: "BINANCE:DOGEUSDT",
  };

  const tradingViewSymbol =
    symbolMapping[symbol || "BITCOIN"] || "BINANCE:BTCUSDT";

  const [hoveredPosition, setHoveredPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [randomOpinion, setRandomOpinion] = useState<{
    cause: string;
    effect: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    const widgetContainer = document.getElementById("tradingview_widget");
    if (widgetContainer) {
      widgetContainer.innerHTML = "";
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

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (!opinions || opinions.length === 0) return;
    const { clientX, clientY } = event;

    setHoveredPosition({ x: clientX, y: clientY });
    setRandomOpinion(opinions[Math.floor(Math.random() * opinions.length)]);
  };

  const handleMouseLeave = () => {
    setHoveredPosition(null);
    setRandomOpinion(null);
  };

  const getTooltipPosition = (x: number, y: number) => {
    const chartElement = document.getElementById("tradingview_widget");
    if (!chartElement) return { x, y };

    const chartRect = chartElement.getBoundingClientRect();
    const padding = 10;
    const tooltipWidth = 200;
    const tooltipHeight = 120;

    const tooltipX = Math.min(
      chartRect.width - tooltipWidth - padding,
      Math.max(padding, x - chartRect.left + padding)
    );
    const tooltipY = Math.min(
      chartRect.height - tooltipHeight - padding,
      Math.max(padding, y - chartRect.top + padding)
    );

    return { x: tooltipX, y: tooltipY };
  };

  return (
    <div className="flex flex-row h-screen bg-black text-white">
      {/* Left: Timeline */}
      <div className="w-1/4 p-4 bg-gray-900 overflow-auto">
        <h2 className="text-lg font-bold mb-4">News</h2>
        <ul className="space-y-4">
          {newsData.map(
            (item, index) =>
              item.coin === symbol && (
                <li key={index} className="p-4 bg-gray-800 rounded">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.content}</p>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </li>
              )
          )}
        </ul>
      </div>

      {/* Center: Chart */}
      <div className="w-3/4 p-4 relative">
        <h1 className="text-2xl font-bold mb-4">{symbol} Chart</h1>

        <div className="relative h-4/5">
          {/* 차트 전체 영역 */}
          <div
            id="tradingview_widget"
            className="absolute inset-0 z-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />

          <div className="absolute inset-0 z-10 grid grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="relative border-l border-gray-700 cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></div>
            ))}
          </div>

          {/* 툴팁 */}
          {hoveredPosition &&
            randomOpinion &&
            randomOpinion.coin === symbol && (
              <div
                className="absolute bg-gray-800 text-white text-sm p-4 rounded shadow-lg max-w-xl"
                style={{
                  top: `${
                    getTooltipPosition(hoveredPosition.x, hoveredPosition.y).y
                  }px`,
                  left: `${
                    getTooltipPosition(hoveredPosition.x, hoveredPosition.y).x
                  }px`,
                  transform: "translate(-50%, -10px)",
                  pointerEvents: "none",
                }}
              >
                <p>
                  <strong>Cause:</strong> {randomOpinion.cause}
                </p>
                <p>
                  <strong>Effect:</strong> {randomOpinion.effect}
                </p>
                <p>
                  <strong>Content:</strong> {randomOpinion.content}
                </p>
                <button 
                  className="mt-2 text-sm text-blue-400 hover:underline"
                  onClick={() => router.push("/information")}>
                  Validate
                </button>
              </div>
            )}
        </div>
      </div>
      {/* Right: Information Panel */}
      <div className="w-1/4 p-4 bg-gray-900 overflow-auto">
        <h2 className="text-lg font-bold mb-4">Opinion</h2>
        <ul className="space-y-4">
          {(opinions) ? (opinions.map((info, index) => info.coin === symbol && (
            <li key={index} className="p-4 bg-gray-800 rounded">
              <p className="text-sm text-gray-400">Cause: {info.cause}</p>
              <h3 className="text-sm text-gray-400">Effect: {info.effect}</h3>
              <p className="text-sm text-gray-500">Source: {info.link}</p>
              <button
                className="mt-2 text-sm text-blue-400 hover:underline"
                onClick={() => router.push("/information")} // 버튼 클릭 시 /information으로 이동
              >
                Validate
              </button>
            </li>
          ))): null}
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
