import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, MapPin, Bus, Utensils, Bed, Activity, Clock, Users, Star } from 'lucide-react';
import useTripStore from '../store/useTripStore';
import WeatherIcon from './WeatherIcon';

const weatherGradients = {
  heat: 'from-orange-500/20 to-red-600/20',
  rain: 'from-blue-500/20 to-indigo-600/20',
  cold: 'from-slate-400/20 to-blue-300/20',
  pleasant: 'from-teal-400/20 to-emerald-600/20',
  clear: 'from-white/10 to-blue-200/10'
};

const TypeIcon = ({ type }) => {
  switch(type) {
    case 'Transport': return <Bus size={16} />;
    case 'Accommodation': return <Bed size={16} />;
    case 'Food': return <Utensils size={16} />;
    case 'Activities': return <Activity size={16} />;
    default: return <MapPin size={16} />;
  }
};

const POICard = ({ dayId, activity }) => {
  const removeActivity = useTripStore(state => state.removeActivity);
  // 'default', 'expanded', 'collapsed'
  const [cardState, setCardState] = useState('default');

  const variants = {
    collapsed: { width: 60, padding: '0.5rem' },
    default: { width: 220, padding: '0.75rem' },
    expanded: { width: 280, padding: '1rem' }
  };

  const handleDragEnd = (event, info) => {
    const threshold = 50; // px
    const velocityThreshold = 150; // px/s
    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swiped right -> Expand
      if (cardState === 'collapsed') setCardState('default');
      else if (cardState === 'default') setCardState('expanded');
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      // Swiped left -> Collapse
      if (cardState === 'expanded') setCardState('default');
      else if (cardState === 'default') setCardState('collapsed');
    }
  };

  return (
    <motion.div
      layout
      variants={variants}
      initial="default"
      animate={cardState}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-surface/90 border border-white/10 rounded-xl shadow-lg flex flex-col gap-2 overflow-hidden shrink-0 relative cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 text-primary">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TypeIcon type={activity.type} />
          </div>
          {cardState !== 'collapsed' && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-white truncate w-32">{activity.name}</span>
              <span className="text-xs text-gray-400">{activity.time} • ₹{activity.cost}</span>
            </div>
          )}
        </div>
      </div>

      {cardState === 'expanded' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-2"
        >
          <p className="text-xs text-gray-300 italic">"{activity.description}"</p>
          <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
            <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {activity.rating}</span>
            <span className="flex items-center gap-1"><Users size={12} /> {activity.crowd}</span>
            <button 
              onClick={() => removeActivity(dayId, activity.id)}
              className="text-red-400 hover:text-red-300 p-1 bg-red-400/10 rounded ml-2"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function TimelineLayer() {
  const trip = useTripStore((state) => state.trip);
  const selectedDayId = useTripStore((state) => state.selectedDayId);
  const setSelectedDay = useTripStore((state) => state.setSelectedDay);

  return (
    <div className="flex-1 w-full flex overflow-x-auto hide-scrollbar snap-x snap-mandatory relative z-10 bg-background/50 backdrop-blur-md px-4 items-start pt-4">
      {trip.days.map((day, index) => {
        const bgGradient = weatherGradients[day.weather] || 'from-gray-800/20 to-gray-900/20';
        const isSelected = selectedDayId === day.day_id;

        return (
          <React.Fragment key={day.day_id}>
            <div 
              onClick={() => setSelectedDay(day.day_id)}
              className={`snap-center shrink-0 w-80 h-full p-4 rounded-t-2xl border-x border-t border-white/5 transition-all cursor-pointer bg-gradient-to-b ${bgGradient} ${isSelected ? 'ring-1 ring-primary/50' : ''}`}
            >
              <div className="flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest mt-1">
  <span>Day {index+1} • {day.city}</span>
  <div className="flex items-center gap-2">
    <WeatherIcon type={day.weather} size={24} />
    <span className="capitalize">{day.weather}</span>
  </div>
</div>

              <div className="flex flex-col gap-3 pb-4">
                <AnimatePresence>
                  {day.activities.map(act => (
                    <motion.div
                      key={act.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <POICard dayId={day.day_id} activity={act} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {day.activities.length === 0 && (
                  <div className="text-sm text-gray-500 italic p-4 text-center border border-dashed border-white/10 rounded-xl">No activities planned.</div>
                )}
              </div>
            </div>

            {/* Transport Connector Line between days */}
            {day.transport_out && (
              <div className="flex flex-col items-center justify-center shrink-0 w-32 h-full relative -ml-4 -mr-4 z-20">
                <div className="absolute w-full h-0.5 bg-primary/30 top-1/2 -translate-y-1/2 -z-10"></div>
                <div className="bg-surface border border-primary/50 rounded-full px-3 py-1.5 shadow-lg flex flex-col items-center cursor-pointer hover:bg-surface/80 transition-colors">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-wider">{day.transport_out.mode}</span>
                  <span className="text-xs text-white">{day.transport_out.duration}</span>
                  <span className="text-[10px] text-gray-400">₹{day.transport_out.cost}</span>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
