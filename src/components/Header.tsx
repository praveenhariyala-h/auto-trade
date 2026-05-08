'use client';

import { motion } from 'framer-motion';

interface HeaderProps {
  isMarketOpen: boolean;
}

export default function Header({ isMarketOpen }: HeaderProps) {
  return (
    <header className="h-[60px] bg-[#111827] border-b border-[#374151] flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D4AA] to-[#3B82F6] flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </motion.div>
        <div>
          <h1 className="text-xl font-bold text-[#F9FAFB]">
            Trade<span className="text-[#00D4AA]">Pulse</span>
          </h1>
          <p className="text-xs text-[#6B7280]">India Markets</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2937] border border-[#374151]">
          <span className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-[#10B981] animate-pulse' : 'bg-[#EF4444]'}`} />
          <span className="text-sm text-[#9CA3AF]">
            Market {isMarketOpen ? 'Live' : 'Closed'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-[#6B7280]">Account</p>
            <p className="text-sm font-semibold text-[#F9FAFB]">₹2,45,680.50</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#00D4AA] flex items-center justify-center text-white font-bold">
            P
          </div>
        </div>
      </div>
    </header>
  );
}