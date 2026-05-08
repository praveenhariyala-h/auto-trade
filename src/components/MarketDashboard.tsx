'use client';

import TradingViewChart from './TradingViewChart';
import LiveSignals from './LiveSignals';
import NewsTicker from './NewsTicker';

export default function MarketDashboard() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <LiveSignals />
        <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
          <TradingViewChart />
        </div>
      </div>
      <NewsTicker />
    </div>
  );
}