export interface Signal {
  id: string;
  name: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  riskScore?: number;
  lastUpdated: Date;
  prediction?: {
    targetPrice: number;
    currentPrice: number;
    accuracy: number;
    timeframe: string;
  };
  sparklineData?: number[];
}

export interface NewsItem {
  id: string;
  headline: string;
  source: 'Moneycontrol' | 'Investing.com';
  timestamp: Date;
  url?: string;
}

export interface Position {
  id: string;
  instrument: string;
  symbol: string;
  avgPrice: number;
  ltp: number;
  quantity: number;
  pnl: number;
  pnlPercent: number;
  productType: 'CNC' | 'MIS';
}

export interface OrderForm {
  instrument: string;
  symbol: string;
  orderType: 'MARKET' | 'LIMIT';
  productType: 'CNC' | 'MIS';
  quantity: number;
  limitPrice?: number;
}

export interface PriceTick {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

export interface PortfolioSummary {
  totalInvested: number;
  totalCurrentValue: number;
  totalPnL: number;
  totalPnLPercent: number;
}

export type TabType = 'market' | 'trade';