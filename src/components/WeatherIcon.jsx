import React from 'react';

export default function WeatherIcon({ type = 'clear', size = 32 }) {
  switch (type) {
    case 'heat':
      // Sun icon
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="8" fill="#FFD600" />
          <g stroke="#FFA000" strokeWidth="2">
            <line x1="16" y1="2" x2="16" y2="7" />
            <line x1="16" y1="25" x2="16" y2="30" />
            <line x1="2" y1="16" x2="7" y2="16" />
            <line x1="25" y1="16" x2="30" y2="16" />
            <line x1="5.5" y1="5.5" x2="9" y2="9" />
            <line x1="23" y1="23" x2="26.5" y2="26.5" />
            <line x1="23" y1="9" x2="26.5" y2="5.5" />
            <line x1="5.5" y1="26.5" x2="9" y2="23" />
          </g>
        </svg>
      );
    case 'rain':
      // Rain cloud
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <ellipse cx="18" cy="20" rx="9" ry="7" fill="#90A4AE" />
          <ellipse cx="13" cy="17" rx="6" ry="4" fill="#B0BEC5" />
          <rect x="11" y="26" width="2" height="5" rx="1" fill="#1976D2" />
          <rect x="17" y="27" width="2" height="4" rx="1" fill="#1976D2" />
          <rect x="23" y="26" width="2" height="3" rx="1" fill="#1976D2" />
        </svg>
      );
    case 'cold':
      // Snowflake (simple)
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <g stroke="#81D4FA" strokeWidth="2">
            <line x1="16" y1="8" x2="16" y2="24" />
            <line x1="8" y1="16" x2="24" y2="16" />
            <line x1="10" y1="10" x2="22" y2="22" />
            <line x1="22" y1="10" x2="10" y2="22" />
          </g>
        </svg>
      );
    case 'pleasant':
      // Sun behind cloud
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="11" cy="13" r="6" fill="#FFD600" />
          <ellipse cx="18" cy="20" rx="9" ry="7" fill="#B0BEC5" />
        </svg>
      );
    case 'clear':
    default:
      // Small sun, minimal
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="8" fill="#FFE082" />
        </svg>
      );
  }
}
