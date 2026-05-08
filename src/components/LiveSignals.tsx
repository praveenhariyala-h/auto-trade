'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Signal } from '../lib/types';
import { liveSignals, generateSparklineData } from '../lib/mockData';

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const height = 30;
  const width = 80;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#10B981' : '#EF4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignalCard({ signal, index }: { signal: Signal; index: number }) {
  const [sparklineData, setSparklineData] = useState(signal.sparklineData || []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparklineData(generateSparklineData(12));
    }, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  const isPositive = signal.type === 'BUY';
  const isNegative = signal.type === 'SELL';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[#1F2937] rounded-xl p-4 border border-[#374151] hover:border-[#00D4AA]/30 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-[#F9FAFB]">{signal.name}</h3>
          <p className="text-xs text-[#6B7280]">
            {signal.riskScore ? 'Risk Mapping' : 'Weekly Predictions'}
          </p>
        </div>
        <div
          className={`px-2 py-1 rounded-lg text-xs font-bold ${
            isPositive
              ? 'bg-[#10B981]/20 text-[#10B981]'
              : isNegative
              ? 'bg-[#EF4444]/20 text-[#EF4444]'
              : 'bg-[#F59E0B]/20 text-[#F59E0B]'
          }`}
        >
          {signal.type}
        </div>
      </div>

      {signal.riskScore ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9CA3AF]">Risk Score</span>
            <span className="text-lg font-bold text-[#F9FAFB]">{signal.riskScore}</span>
          </div>
          <div className="h-2 bg-[#374151] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${signal.riskScore}%` }}
              className={`h-full rounded-full ${
                signal.riskScore > 70
                  ? 'bg-[#EF4444]'
                  : signal.riskScore > 40
                  ? 'bg-[#F59E0B]'
                  : 'bg-[#10B981]'
              }`}
            />
          </div>
          <div className="flex items-center justify-between">
            <Sparkline data={sparklineData} positive={signal.type === 'BUY'} />
            <div className="text-right">
              <p className="text-xs text-[#6B7280]">Confidence</p>
              <p className="text-sm font-bold text-[#00D4AA]">{signal.confidence}%</p>
            </div>
          </div>
        </div>
      ) : signal.prediction ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9CA3AF]">Current</span>
            <span className="text-sm font-mono text-[#F9FAFB]">
              ₹{signal.prediction.currentPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9CA3AF]">Target</span>
            <span className="text-sm font-mono text-[#00D4AA]">
              ₹{signal.prediction.targetPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <Sparkline data={sparklineData} positive={signal.prediction.targetPrice > signal.prediction.currentPrice} />
            <div className="text-right">
              <p className="text-xs text-[#6B7280]">Accuracy</p>
              <p className="text-sm font-bold text-[#3B82F6]">{signal.prediction.accuracy}%</p>
            </div>
          </div>
        </div>
      ) : null}

      <p className="text-xs text-[#6B7280] mt-3">
        Updated {signal.lastUpdated.toLocaleTimeString()}
      </p>
    </motion.div>
  );
}

export default function LiveSignals() {
  return (
    <div className="w-[280px] bg-[#111827] border-r border-[#374151] p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-[#00D4AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h2 className="text-lg font-semibold text-[#F9FAFB]">Live Signals</h2>
      </div>
      <div className="space-y-4">
        {liveSignals.map((signal, index) => (
          <SignalCard key={signal.id} signal={signal} index={index} />
        ))}
      </div>
    </div>
  );
}