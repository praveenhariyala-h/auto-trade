import { Signal, NewsItem, Position, PriceTick } from './types';

export const liveSignals: Signal[] = [
  {
    id: '1',
    name: 'DeepTracker AI',
    type: 'BUY',
    confidence: 78,
    riskScore: 42,
    lastUpdated: new Date(),
    sparklineData: [35, 42, 38, 45, 52, 48, 55, 62, 58, 65, 72, 68, 75],
  },
  {
    id: '2',
    name: 'Choice India',
    type: 'HOLD',
    confidence: 65,
    lastUpdated: new Date(),
    prediction: {
      targetPrice: 24500,
      currentPrice: 24250,
      accuracy: 72,
      timeframe: '1 Week',
    },
    sparklineData: [120, 118, 122, 119, 121, 124, 122, 120],
  },
  {
    id: '3',
    name: 'DeepTracker AI',
    type: 'SELL',
    confidence: 82,
    riskScore: 78,
    lastUpdated: new Date(),
    sparklineData: [85, 88, 82, 79, 75, 72, 68, 65, 62, 58],
  },
  {
    id: '4',
    name: 'Choice India',
    type: 'BUY',
    confidence: 71,
    lastUpdated: new Date(),
    prediction: {
      targetPrice: 3150,
      currentPrice: 2980,
      accuracy: 68,
      timeframe: '1 Week',
    },
    sparklineData: [2800, 2850, 2820, 2890, 2920, 2950, 2980],
  },
];

export const newsItems: NewsItem[] = [
  { id: '1', headline: 'Nifty50 closes at record high amid strong FII inflows', source: 'Moneycontrol', timestamp: new Date() },
  { id: '2', headline: 'RBI keeps repo rate unchanged at 6.5% in latest MPC meeting', source: 'Investing.com', timestamp: new Date() },
  { id: '3', headline: 'Reliance Industries Q3 results beat estimates, net profit up 12%', source: 'Moneycontrol', timestamp: new Date() },
  { id: '4', headline: 'IT sector rallies on strong US jobs data, TCS leads gains', source: 'Investing.com', timestamp: new Date() },
  { id: '5', headline: 'SEBI new margin rules effective from next week - What investors need to know', source: 'Moneycontrol', timestamp: new Date() },
  { id: '6', headline: 'Bank Nifty hits all-time high as lending rates show stability', source: 'Investing.com', timestamp: new Date() },
  { id: '7', headline: 'FIIs turn net buyers in Indian markets after 5-day selloff', source: 'Moneycontrol', timestamp: new Date() },
  { id: '8', headline: 'Auto stocks surge ahead of February sales data announcement', source: 'Investing.com', timestamp: new Date() },
];

export const mockPositions: Position[] = [
  { id: '1', instrument: 'NIFTY 50', symbol: 'NSE:NIFTY', avgPrice: 22450.0, ltp: 22485.3, quantity: 50, pnl: 1765.0, pnlPercent: 0.16, productType: 'MIS' },
  { id: '2', instrument: 'RELIANCE', symbol: 'NSE:RELIANCE', avgPrice: 2980.5, ltp: 2975.2, quantity: 100, pnl: -530.0, pnlPercent: -0.18, productType: 'CNC' },
  { id: '3', instrument: 'INFY', symbol: 'NSE:INFY', avgPrice: 1680.25, ltp: 1725.8, quantity: 75, pnl: 3416.25, pnlPercent: 2.73, productType: 'MIS' },
  { id: '4', instrument: 'TCS', symbol: 'NSE:TCS', avgPrice: 4250.0, ltp: 4218.5, quantity: 25, pnl: -787.5, pnlPercent: -0.74, productType: 'CNC' },
  { id: '5', instrument: 'HDFCBANK', symbol: 'NSE:HDFCBANK', avgPrice: 1625.8, ltp: 1645.2, quantity: 150, pnl: 2910.0, pnlPercent: 1.19, productType: 'MIS' },
  { id: '6', instrument: 'ADANI Ports', symbol: 'NSE:ADANIPORTS', avgPrice: 1245.6, ltp: 1218.9, quantity: 200, pnl: -5340.0, pnlPercent: -2.14, productType: 'MIS' },
];

export const instruments = [
  { name: 'NIFTY 50', symbol: 'NSE:NIFTY', price: 22485.3 },
  { name: 'RELIANCE', symbol: 'NSE:RELIANCE', price: 2975.2 },
  { name: 'INFY', symbol: 'NSE:INFY', price: 1725.8 },
  { name: 'TCS', symbol: 'NSE:TCS', price: 4218.5 },
  { name: 'HDFCBANK', symbol: 'NSE:HDFCBANK', price: 1645.2 },
  { name: 'ADANI Ports', symbol: 'NSE:ADANIPORTS', price: 1218.9 },
  { name: 'SBIN', symbol: 'NSE:SBIN', price: 825.4 },
  { name: 'TATASTEEL', symbol: 'NSE:TATASTEEL', price: 158.6 },
];

export function generatePriceTick(symbol: string, basePrice: number): PriceTick {
  const change = (Math.random() - 0.5) * 10;
  const price = basePrice + change;
  const changePercent = (change / basePrice) * 100;
  return {
    symbol,
    price: parseFloat(price.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    timestamp: new Date(),
  };
}

export function generateSparklineData(length: number): number[] {
  const data: number[] = [];
  let value = 50 + Math.random() * 30;
  for (let i = 0; i < length; i++) {
    value += (Math.random() - 0.5) * 10;
    value = Math.max(10, Math.min(100, value));
    data.push(parseFloat(value.toFixed(1)));
  }
  return data;
}