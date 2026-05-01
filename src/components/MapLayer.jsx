import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import useTripStore from '../store/useTripStore';

// Read token from local .env file - never committed to GitHub
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapLayer() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const trip = useTripStore((state) => state.trip);
  const selectedDayId = useTripStore((state) => state.selectedDayId);
  const animationRef = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: trip.origin.coordinates,
      zoom: 5,
      pitch: 45,
    });

    map.current.on('load', () => {
      // Gather all coordinates to form a route
      const allCoords = [trip.origin.coordinates];
      trip.days.forEach(day => {
        day.activities.forEach(act => {
          allCoords.push(act.coordinates);
        });
      });
      allCoords.push(trip.destination.coordinates);

      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: allCoords
          }
        }
      });

      map.current.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3B82F6',
          'line-width': 4,
          'line-opacity': 0.5
        }
      });

      // Add highlighted route source
      map.current.addSource('highlighted-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        }
      });

      map.current.addLayer({
        id: 'highlighted-route-line',
        type: 'line',
        source: 'highlighted-route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#8B5CF6',
          'line-width': 6,
          'line-opacity': 1
        }
      });

      // Animated point
      map.current.addSource('point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: allCoords[0]
          }
        }
      });

      // Load a custom SVG marker or use circle
      map.current.addLayer({
        id: 'point-layer',
        source: 'point',
        type: 'circle',
        paint: {
          'circle-radius': 8,
          'circle-color': '#ffffff',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#8B5CF6'
        }
      });

      // Animate the point along the line
      let startTime = performance.now();
      const duration = 10000; // 10 seconds per loop

      function animateMarker(timestamp) {
        const progress = ((timestamp - startTime) % duration) / duration;
        
        // Simple linear interpolation for the whole route
        // In a real app, use turf.js along to get precise distance
        const totalPoints = allCoords.length;
        const exactIndex = progress * (totalPoints - 1);
        const lowerIndex = Math.floor(exactIndex);
        const upperIndex = Math.ceil(exactIndex);
        const segmentProgress = exactIndex - lowerIndex;

        if (lowerIndex < totalPoints - 1) {
          const start = allCoords[lowerIndex];
          const end = allCoords[upperIndex];
          
          const currentLng = start[0] + (end[0] - start[0]) * segmentProgress;
          const currentLat = start[1] + (end[1] - start[1]) * segmentProgress;

          const source = map.current.getSource('point');
          if (source) {
            source.setData({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [currentLng, currentLat]
              }
            });
          }
        }

        animationRef.current = requestAnimationFrame(animateMarker);
      }
      
      animationRef.current = requestAnimationFrame(animateMarker);

      // Fit bounds
      const bounds = new mapboxgl.LngLatBounds(
        allCoords[0],
        allCoords[0]
      );
      for (const coord of allCoords) {
        bounds.extend(coord);
      }
      map.current.fitBounds(bounds, { padding: 50 });
    });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [trip]);

  // Handle selected day highlighting
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    const source = map.current.getSource('highlighted-route');
    if (source && selectedDayId) {
      const selectedDay = trip.days.find(d => d.day_id === selectedDayId);
      if (selectedDay && selectedDay.activities.length > 0) {
        const coords = selectedDay.activities.map(a => a.coordinates);
        if (coords.length === 1) {
          // just a point
          source.setData({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [coords[0], coords[0]]
            }
          });
        } else if (coords.length > 1) {
          source.setData({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          });
          
          // Fly to the day's first activity
          map.current.flyTo({
            center: coords[0],
            zoom: 8,
            essential: true
          });
        }
      } else {
        source.setData({
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        });
      }
    }
  }, [selectedDayId, trip.days]);

  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
}
