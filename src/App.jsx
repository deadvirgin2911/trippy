import React from 'react';
import useTripStore from './store/useTripStore';
import LandingPage from './components/LandingPage';
import MapLayer from './components/MapLayer';
import BudgetBar from './components/BudgetBar';
import TimelineLayer from './components/TimelineLayer';

function App() {
  const appState = useTripStore((state) => state.appState);

  if (appState === 'landing') {
    return <LandingPage />;
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-background relative">
      {/* Top 60% Map Layer */}
      <div className="h-[60vh] w-full relative">
        <MapLayer />
      </div>

      {/* Bottom 40% Timeline & Budget Layer */}
      <div className="h-[40vh] w-full flex flex-col bg-surface shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10 relative">
        <BudgetBar />
        <TimelineLayer />
      </div>

      {/* Inline Planning Box */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4">
        <div className="bg-surface border border-white/20 rounded-full shadow-2xl p-2 flex items-center backdrop-blur-md">
          <input 
            type="text" 
            placeholder="Add budget hotel near Manali bus stand..." 
            className="flex-1 bg-transparent text-white px-4 focus:outline-none text-sm placeholder:text-gray-400"
          />
          <button className="bg-primary hover:bg-primary/80 text-white rounded-full px-4 py-2 text-sm font-semibold transition-colors">
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
