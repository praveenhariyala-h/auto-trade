'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsItem } from '../lib/types';
import { newsItems } from '../lib/mockData';

function NewsTickerItem({ item, index }: { item: NewsItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center gap-3 px-4 py-2 hover:bg-[#1F2937] transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            item.source === 'Moneycontrol'
              ? 'bg-[#3B82F6]/20 text-[#3B82F6]'
              : 'bg-[#00D4AA]/20 text-[#00D4AA]'
          }`}
        >
          {item.source}
        </span>
        <span className="text-sm text-[#9CA3AF] truncate max-w-md">
          {item.headline}
        </span>
        <span className="text-xs text-[#6B7280] ml-auto">
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#1F2937] border-t border-[#374151] overflow-hidden"
          >
            <div className="p-4">
              <p className="text-sm text-[#F9FAFB] leading-relaxed">{item.headline}</p>
              <p className="text-xs text-[#6B7280] mt-2">
                Published at {item.timestamp.toLocaleString()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="h-[40px] bg-[#111827] border-t border-[#374151] flex items-center overflow-hidden">
      <div className="flex items-center gap-2 px-4 border-r border-[#374151] h-full">
        <svg className="w-4 h-4 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <span className="text-xs font-semibold text-[#F9FAFB]">NEWS</span>
      </div>

      <div
        className="flex-1 overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex items-center"
          animate={{ x: -currentIndex * 300 }}
          transition={{ type: 'tween', duration: 0.5 }}
        >
          {newsItems.map((item, index) => (
            <div key={item.id} className="flex-shrink-0 w-[400px]">
              <NewsTickerItem item={item} index={index} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex items-center gap-1 px-4 border-l border-[#374151] h-full">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
        <span className="text-xs text-[#9CA3AF]">Live</span>
      </div>
    </div>
  );
}