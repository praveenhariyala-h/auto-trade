'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../components/Header';
import TabNavigation from '../components/TabNavigation';
import MarketDashboard from '../components/MarketDashboard';
import TradeDashboard from '../components/TradeDashboard';
import { TabType } from '../lib/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('market');
  const isMarketOpen = true;

  return (
    <div className="h-screen bg-[#0A0E17] flex flex-col overflow-hidden">
      <Header isMarketOpen={isMarketOpen} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'market' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'market' ? 20 : -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'market' ? <MarketDashboard /> : <TradeDashboard />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}