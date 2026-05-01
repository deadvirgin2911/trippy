import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useTripStore from '../store/useTripStore';

export default function LandingPage() {
  const startPlanning = useTripStore((state) => state.startPlanning);
  const trip = useTripStore((state) => state.trip);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Abstract Animated Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-accent/20 to-transparent blur-3xl opacity-50"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/India_map_en.svg/1024px-India_map_en.svg.png')] bg-no-repeat bg-contain bg-center opacity-10 blur-sm" />
      </div>

      {/* Floating Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel p-8 w-full max-w-md z-10 flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Plan Your Journey
          </h1>
          <p className="text-sm text-gray-400 mt-2">Design your perfect trip experience</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">From</label>
            <input 
              type="text" 
              value={trip.origin.name} 
              readOnly 
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">To</label>
            <input 
              type="text" 
              value={trip.destination.name} 
              readOnly 
              className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Dates</label>
            <div className="flex gap-2 mt-1">
              <input 
                type="date" 
                value={trip.start_date}
                readOnly
                className="w-1/2 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
              />
              <input 
                type="date" 
                value={trip.end_date}
                readOnly
                className="w-1/2 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startPlanning}
          className="w-full py-4 mt-4 bg-gradient-to-r from-primary to-accent rounded-xl font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
        >
          Start Planning
        </motion.button>
      </motion.div>
    </div>
  );
}
