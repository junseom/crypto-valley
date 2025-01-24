'use client';

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { newsData } from "@/states/mock-news.data";
import { useOpinions } from "@/states/opinions.state";

const DynamicChartPage = () => {
  const pathname = usePathname();
  const symbol = pathname.split("/").pop()?.toUpperCase();
  const opinions = useOpinions();

  // Binance 심볼 매핑
  const symbolMapping: { [key: string]: string } = {
    BITCOIN: "BINANCE:BTCUSDT",
    ETHEREUM: "BINANCE:ETHUSDT",
    DOGECOIN: "BINANCE:DOGEUSDT",
  };

  const tradingViewSymbol = symbolMapping[symbol || "BITCOIN"] || "BINANCE:BTCUSDT";

  const [hoveredPosition, setHoveredPosition] = useState<{ x: number; y: number } | null>(null);
  const [randomOpinion, setRandomOpinion] = useState<{ cause: string; effect: string; content: string } | null>(null);

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

  // 랜덤 opinion 설정
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
    const padding = 10; // 툴팁과 커서 간의 간격
    const tooltipWidth = 200; // 툴팁의 너비 (예시)
    const tooltipHeight = 120; // 툴팁의 높이 (예시)

    // X, Y 좌표가 차트 영역을 벗어나지 않도록 조정
    const tooltipX = Math.min(chartRect.width - tooltipWidth - padding, Math.max(padding, x - chartRect.left + padding));
    const tooltipY = Math.min(chartRect.height - tooltipHeight - padding, Math.max(padding, y - chartRect.top + padding));

    return { x: tooltipX, y: tooltipY };
  };

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
      <div className="w-3/4 p-4 relative">
        <h1 className="text-2xl font-bold mb-4">{symbol} Chart</h1>

        {/* 차트와 가로 분할 */}
        <div className="relative h-4/5">
          {/* 차트 전체 영역 */}
          <div
            id="tradingview_widget"
            className="absolute inset-0 z-0"
            onMouseEnter={handleMouseEnter} // 차트 영역에 마우스 들어올 때
            onMouseLeave={handleMouseLeave} // 차트 영역에서 마우스 나갈 때
          />

          {/* 가로 분할된 영역 */}
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
          {hoveredPosition && randomOpinion && (
            <div
              className="absolute bg-gray-800 text-white text-sm p-4 rounded shadow-lg max-w-xl"
              style={{
                top: `${getTooltipPosition(hoveredPosition.x, hoveredPosition.y).y}px`,
                left: `${getTooltipPosition(hoveredPosition.x, hoveredPosition.y).x}px`,
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicChartPage;
