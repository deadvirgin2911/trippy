import { create } from 'zustand';
import mockData from '../mockData.json';

const useTripStore = create((set, get) => ({
  trip: mockData,
  appState: 'landing', // 'landing' | 'planning'
  selectedDayId: null,

  startPlanning: () => set({ appState: 'planning', selectedDayId: mockData.days[0].day_id }),
  
  setSelectedDay: (dayId) => set({ selectedDayId: dayId }),

  removeActivity: (dayId, activityId) => set((state) => {
    const newDays = state.trip.days.map((day) => {
      if (day.day_id === dayId) {
        return {
          ...day,
          activities: day.activities.filter(a => a.id !== activityId)
        };
      }
      return day;
    });
    return { trip: { ...state.trip, days: newDays } };
  }),

  // Derived state helper
  getTotals: () => {
    const { trip } = get();
    const totals = { Transport: 0, Accommodation: 0, Food: 0, Activities: 0, Total: 0 };
    trip.days.forEach(day => {
      day.activities.forEach(act => {
        if (totals[act.type] !== undefined) {
          totals[act.type] += act.cost;
        }
        totals.Total += act.cost;
      });
      if (day.transport_out) {
        totals.Transport += day.transport_out.cost;
        totals.Total += day.transport_out.cost;
      }
    });
    return totals;
  }
}));

export default useTripStore;
