'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KillSwitchProps {
  onTrigger: () => void;
  disabled?: boolean;
}

export default function KillSwitch({ onTrigger, disabled = false }: KillSwitchProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleConfirm = async () => {
    setIsExecuting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onTrigger();
    setShowConfirm(false);
    setIsExecuting(false);
  };

  return (
    <>
      <motion.button
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        disabled={disabled}
        onClick={() => setShowConfirm(true)}
        className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
          disabled
            ? 'bg-[#374151] text-[#6B7280] cursor-not-allowed'
            : 'bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white shadow-lg shadow-[#DC2626]/30 hover:shadow-[#DC2626]/50'
        }`}
      >
        <motion.div
          animate={disabled ? {} : { scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-white"
        />
        KILL SWITCH - EMERGENCY EXIT ALL POSITIONS
      </motion.button>

      {!disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-center"
        >
          <p className="text-xs text-[#F59E0B]">SEBI Compliant • Immediate Effect • No Confirmation</p>
        </motion.div>
      )}

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => !isExecuting && setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111827] rounded-2xl border-2 border-[#DC2626] p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-[#DC2626] mx-auto mb-6 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </motion.div>

              <h3 className="text-2xl font-bold text-[#DC2626] text-center mb-2">
                EMERGENCY EXIT
              </h3>
              <p className="text-[#9CA3AF] text-center mb-6">
                This will immediately close ALL open positions at market price.
              </p>

              {isExecuting ? (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-[#F9FAFB] font-semibold">Closing all positions...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-lg p-4">
                    <p className="text-sm text-[#F9FAFB]">
                      By clicking &quot;EXECUTE EMERGENCY EXIT&quot;, you acknowledge that:
                    </p>
                    <ul className="mt-2 text-xs text-[#9CA3AF] list-disc list-inside">
                      <li>All positions will be closed immediately</li>
                      <li>Orders will be executed at best available market price</li>
                      <li>This action cannot be undone</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 py-3 rounded-xl bg-[#1F2937] text-[#9CA3AF] font-semibold hover:text-[#F9FAFB] transition-colors border border-[#374151]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 py-3 rounded-xl bg-[#DC2626] text-white font-bold"
                    >
                      EXECUTE
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}