'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Position } from '../lib/types';
import { mockPositions, generatePriceTick } from '../lib/mockData';

function PortfolioRow({ position, onClose }: { position: Position; onClose: (id: string) => void }) {
  const [ltp, setLtp] = useState(position.ltp);
  const [isFlashing, setIsFlashing] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const tick = generatePriceTick(position.symbol, position.ltp);
      setLtp(tick.price);
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 300);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [position.symbol, position.ltp]);

  const pnl = (ltp - position.avgPrice) * position.quantity;
  const pnlPercent = ((ltp - position.avgPrice) / position.avgPrice) * 100;
  const isPositive = pnl >= 0;

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b border-[#374151] hover:bg-[#1F2937]/50 transition-colors"
      >
        <td className="py-4 px-4">
          <div>
            <p className="font-medium text-[#F9FAFB]">{position.instrument}</p>
            <p className="text-xs text-[#6B7280]">{position.symbol}</p>
          </div>
        </td>
        <td className="py-4 px-4 font-mono text-[#9CA3AF]">
          ₹{position.avgPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </td>
        <td className="py-4 px-4">
          <motion.span
            animate={isFlashing ? { backgroundColor: isPositive ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)' } : {}}
            className={`font-mono font-semibold ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}
          >
            ₹{ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </motion.span>
        </td>
        <td className="py-4 px-4">
          <div className={`font-mono font-semibold ${isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            <span>{isPositive ? '+' : ''}₹{pnl.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            <span className="text-xs ml-1">({isPositive ? '+' : ''}{pnlPercent.toFixed(2)}%)</span>
          </div>
        </td>
        <td className="py-4 px-4">
          <button
            onClick={() => setShowCloseConfirm(true)}
            className="px-3 py-1.5 rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-sm font-medium hover:bg-[#EF4444]/20 transition-colors"
          >
            Close
          </button>
        </td>
      </motion.tr>

      <AnimatePresence>
        {showCloseConfirm && (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <td colSpan={5} className="py-4 px-4 bg-[#1F2937]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#9CA3AF]">
                  Are you sure you want to close this position?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCloseConfirm(false)}
                    className="px-3 py-1.5 rounded-lg bg-[#374151] text-[#9CA3AF] text-sm font-medium hover:text-[#F9FAFB]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onClose(position.id);
                      setShowCloseConfirm(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#EF4444] text-white text-sm font-medium"
                  >
                    Confirm Close
                  </button>
                </div>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Portfolio() {
  const [positions, setPositions] = useState<Position[]>(mockPositions);

  const totalInvested = positions.reduce((sum, p) => sum + p.avgPrice * p.quantity, 0);
  const totalCurrentValue = positions.reduce((sum, p) => sum + p.ltp * p.quantity, 0);
  const totalPnL = totalCurrentValue - totalInvested;
  const totalPnLPercent = (totalPnL / totalInvested) * 100;

  const handleClose = (id: string) => {
    setPositions(positions.filter((p) => p.id !== id));
  };

  if (positions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#111827] rounded-xl border border-[#374151] p-12 text-center"
      >
        <svg className="w-16 h-16 mx-auto text-[#374151] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">No Open Positions</h3>
        <p className="text-[#6B7280]">Start trading to see your portfolio here</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden"
    >
      <div className="p-6 border-b border-[#374151]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#F9FAFB]">Live Portfolio</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-[#6B7280]">Total Invested</p>
              <p className="text-sm font-mono text-[#F9FAFB]">
                ₹{totalInvested.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#6B7280]">Current Value</p>
              <p className="text-sm font-mono text-[#F9FAFB]">
                ₹{totalCurrentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#6B7280]">Total P&L</p>
              <p className={`text-lg font-bold font-mono ${totalPnL >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                <span className="text-xs ml-1">({totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0A0E17]">
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Instrument</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Avg Price</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">LTP</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">P&L</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <PortfolioRow key={position.id} position={position} onClose={handleClose} />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}