'use client';

import { useState } from 'react';
import TradePanel from './TradePanel';
import Portfolio from './Portfolio';
import KillSwitch from './KillSwitch';

export default function TradeDashboard() {
  const [positions, setPositions] = useState<string[]>([]);

  const handleKillSwitch = () => {
    setPositions([]);
  };

  const handleOrderSubmit = (order: {
    instrument: string;
    symbol: string;
    orderType: 'MARKET' | 'LIMIT';
    productType: 'CNC' | 'MIS';
    quantity: number;
    limitPrice?: number;
    side: 'BUY' | 'SELL';
  }) => {
    console.log('Order submitted:', order);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <TradePanel onOrderSubmit={handleOrderSubmit} />
        <Portfolio />
        <KillSwitch onTrigger={handleKillSwitch} disabled={positions.length === 0 && true} />
      </div>
    </div>
  );
}