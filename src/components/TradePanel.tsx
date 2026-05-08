'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { instruments } from '../lib/mockData';

interface TradePanelProps {
  onOrderSubmit?: (order: {
    instrument: string;
    symbol: string;
    orderType: 'MARKET' | 'LIMIT';
    productType: 'CNC' | 'MIS';
    quantity: number;
    limitPrice?: number;
    side: 'BUY' | 'SELL';
  }) => void;
}

export default function TradePanel({ onOrderSubmit }: TradePanelProps) {
  const [instrument, setInstrument] = useState(instruments[0]);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [productType, setProductType] = useState<'CNC' | 'MIS'>('MIS');
  const [quantity, setQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState(instrument.price);
  const [showConfirm, setShowConfirm] = useState<{
    side: 'BUY' | 'SELL';
    show: boolean;
  }>({ side: 'BUY', show: false });

  const estimatedCost = quantity * (orderType === 'MARKET' ? instrument.price : limitPrice);

  const handleSubmit = (side: 'BUY' | 'SELL') => {
    if (quantity < 1) return;
    setShowConfirm({ side, show: true });
  };

  const confirmOrder = () => {
    onOrderSubmit?.({
      instrument: instrument.name,
      symbol: instrument.symbol,
      orderType,
      productType,
      quantity,
      limitPrice: orderType === 'LIMIT' ? limitPrice : undefined,
      side: showConfirm.side,
    });
    setShowConfirm({ side: 'BUY', show: false });
    setQuantity(1);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111827] rounded-xl border border-[#374151] p-6"
      >
        <h2 className="text-lg font-semibold text-[#F9FAFB] mb-4">Trade Execution</h2>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-xs text-[#6B7280] mb-1">Instrument</label>
            <select
              value={instrument.symbol}
              onChange={(e) => {
                const inst = instruments.find((i) => i.symbol === e.target.value);
                if (inst) {
                  setInstrument(inst);
                  setLimitPrice(inst.price);
                }
              }}
              className="w-full bg-[#1F2937] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#F9FAFB] focus:outline-none focus:border-[#00D4AA]"
            >
              {instruments.map((inst) => (
                <option key={inst.symbol} value={inst.symbol}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-[#6B7280] mb-1">Order Type</label>
            <div className="flex rounded-lg overflow-hidden border border-[#374151]">
              {(['MARKET', 'LIMIT'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    orderType === type
                      ? 'bg-[#00D4AA] text-[#0A0E17]'
                      : 'bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#6B7280] mb-1">Product Type</label>
            <div className="flex rounded-lg overflow-hidden border border-[#374151]">
              {(['CNC', 'MIS'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setProductType(type)}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    productType === type
                      ? 'bg-[#00D4AA] text-[#0A0E17]'
                      : 'bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#6B7280] mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-[#1F2937] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#F9FAFB] font-mono focus:outline-none focus:border-[#00D4AA]"
            />
          </div>
        </div>

        {orderType === 'LIMIT' && (
          <div className="mb-6">
            <label className="block text-xs text-[#6B7280] mb-1">Limit Price</label>
            <input
              type="number"
              step="0.05"
              value={limitPrice}
              onChange={(e) => setLimitPrice(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#1F2937] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#F9FAFB] font-mono focus:outline-none focus:border-[#00D4AA]"
            />
          </div>
        )}

        <div className="flex items-center justify-between mb-6 p-4 bg-[#1F2937] rounded-lg border border-[#374151]">
          <div>
            <p className="text-xs text-[#6B7280]">Estimated {showConfirm.side === 'BUY' ? 'Cost' : 'Value'}</p>
            <p className="text-xl font-bold font-mono text-[#F9FAFB]">
              ₹{estimatedCost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#6B7280]">Market Price</p>
            <p className="text-sm font-mono text-[#00D4AA]">
              ₹{instrument.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSubmit('BUY')}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-lg shadow-lg shadow-[#10B981]/20 hover:shadow-[#10B981]/40 transition-all"
          >
            BUY
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSubmit('SELL')}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white font-bold text-lg shadow-lg shadow-[#EF4444]/20 hover:shadow-[#EF4444]/40 transition-all"
          >
            SELL
          </motion.button>
        </div>
      </motion.div>

      {showConfirm.show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowConfirm({ side: 'BUY', show: false })}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111827] rounded-2xl border border-[#374151] p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#F9FAFB] mb-4">Confirm Order</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Instrument</span>
                <span className="text-[#F9FAFB] font-medium">{instrument.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Order Type</span>
                <span className="text-[#F9FAFB] font-medium">{orderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Product Type</span>
                <span className="text-[#F9FAFB] font-medium">{productType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Quantity</span>
                <span className="text-[#F9FAFB] font-medium font-mono">{quantity}</span>
              </div>
              {orderType === 'LIMIT' && (
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Limit Price</span>
                  <span className="text-[#F9FAFB] font-medium font-mono">₹{limitPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-[#374151] pt-3 flex justify-between">
                <span className="text-[#6B7280]">Estimated Value</span>
                <span className="text-[#F9FAFB] font-bold font-mono">₹{estimatedCost.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm({ side: 'BUY', show: false })}
                className="flex-1 py-3 rounded-xl bg-[#1F2937] text-[#9CA3AF] font-semibold hover:text-[#F9FAFB] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmOrder}
                className={`flex-1 py-3 rounded-xl font-bold ${
                  showConfirm.side === 'BUY'
                    ? 'bg-[#10B981] text-white'
                    : 'bg-[#EF4444] text-white'
                }`}
              >
                Confirm {showConfirm.side}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}