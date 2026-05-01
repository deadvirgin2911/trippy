import React from 'react';
import { motion } from 'framer-motion';
import useTripStore from '../store/useTripStore';

export default function BudgetBar() {
  const totals = useTripStore((state) => state.getTotals());

  const categories = [
    { name: 'Transport', color: 'bg-blue-500' },
    { name: 'Accommodation', color: 'bg-purple-500' },
    { name: 'Food', color: 'bg-orange-500' },
    { name: 'Activities', color: 'bg-green-500' }
  ];

  const totalCost = totals.Total || 1; // Prevent div by 0

  return (
    <div className="w-full bg-surface/90 border-b border-white/10 p-4 shadow-md z-20 flex flex-col justify-center shrink-0">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300">Estimated Budget</h3>
        <div className="font-bold text-lg text-white">₹{totals.Total.toLocaleString()}</div>
      </div>
      
      {/* Segmented Bar */}
      <div className="h-3 w-full bg-black/50 rounded-full flex overflow-hidden">
        {categories.map(cat => {
          const amount = totals[cat.name] || 0;
          const percentage = (amount / totalCost) * 100;
          return (
            <motion.div 
              key={cat.name}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full ${cat.color}`}
              title={`${cat.name}: ₹${amount}`}
            />
          );
        })}
      </div>

      <div className="flex gap-4 mt-2 text-xs text-gray-400">
        {categories.map(cat => (
          <div key={cat.name} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
            <span>{cat.name} (₹{totals[cat.name] || 0})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
