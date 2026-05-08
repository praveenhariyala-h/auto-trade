'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    TradingView: {
      widget: new (config: Record<string, unknown>) => void;
    };
  }
}

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
}

export default function TradingViewChart({
  symbol = 'NSE:NIFTY',
  interval = '15',
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (containerRef.current && window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: interval,
          timezone: 'Asia/Kolkata',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#0A0E17',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview-chart',
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          backgroundColor: '#0A0E17',
          studies: ['RSI@tv-basicstudy', 'MASimple@tv-basicstudy'],
          overrides: {
            'mainSeriesProperties.candleStyle.upColor': '#10B981',
            'mainSeriesProperties.candleStyle.downColor': '#EF4444',
            'mainSeriesProperties.candleStyle.wickUpColor': '#10B981',
            'mainSeriesProperties.candleStyle.wickDownColor': '#EF4444',
            'paneProperties.background': '#0A0E17',
            'paneProperties.vertGridProperties.color': '#1F2937',
            'paneProperties.horzGridProperties.color': '#1F2937',
          },
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = '';
      }
      script.remove();
    };
  }, [symbol, interval]);

  return (
    <div className="flex-1 h-full bg-[#0A0E17] rounded-xl border border-[#374151] overflow-hidden">
      <div className="h-10 bg-[#111827] border-b border-[#374151] flex items-center px-4">
        <div className="flex items-center gap-2">
          <span className="text-[#00D4AA] font-semibold">{symbol.replace('NSE:', '')}</span>
          <span className="text-xs text-[#6B7280]">15M</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs text-[#9CA3AF]">Live</span>
        </div>
      </div>
      <div
        ref={widgetContainerRef}
        id="tradingview-chart"
        className="h-[calc(100%-40px)] w-full"
      />
    </div>
  );
}