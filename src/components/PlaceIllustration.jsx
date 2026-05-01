import React from "react";

/**
 * Props:
 * - city (string): Determines which illustration to show (case-insensitive, fuzzy match supported)
 * - size (number): width/height in px (default 48)
 */

export default function PlaceIllustration({ city = "", size = 48 }) {
  city = (city || "").toLowerCase();
  if (city.includes("jaipur"))
    // Hawa Mahal stylized
    return (
      <svg width={size} height={size * 0.7} viewBox="0 0 60 40" fill="none">
        <rect x="10" y="20" width="40" height="15" rx="7" fill="#ffb300" />
        <rect x="13" y="15" width="34" height="10" rx="5" fill="#ffcc80" />
        <ellipse cx="30" cy="15" rx="10" ry="5" fill="#ffcc80" />
        <rect x="15" y="27" width="4" height="8" rx="2" fill="#8d6e63" />
        <rect x="41" y="27" width="4" height="8" rx="2" fill="#8d6e63" />
        <rect x="29" y="25" width="2" height="10" rx="1" fill="#bf360c" />
        <text x="30" y="37" fontSize="6" fill="#bf360c" textAnchor="middle" opacity="0.7">Jaipur</text>
      </svg>
    );
  if (city.includes("manali"))
    // Snow-capped peak
    return (
      <svg width={size} height={size * 0.7} viewBox="0 0 48 32" fill="none">
        <polygon points="4,28 24,4 44,28" fill="#90caf9" />
        <polygon points="18,16 24,4 30,16" fill="#e3f2fd" />
        <polygon points="12,24 18,16 24,28" fill="#e1e9ee" />
        <polygon points="24,28 30,16 36,24" fill="#bce8fa" />
        <text x="24" y="30" fontSize="6" fill="#1976d2" textAnchor="middle" opacity="0.7">Manali</text>
      </svg>
    );
  if (city.includes("goa"))
    // Palm & beach
    return (
      <svg width={size} height={size * 0.7} viewBox="0 0 48 32" fill="none">
        <ellipse cx="24" cy="26" rx="18" ry="4" fill="#ffe082" />
        {/* Trunk */}
        <rect x="22.5" y="14" width="3" height="12" rx="1.5" fill="#a1887f" />
        {/* Fronds */}
        <path d="M24 14 Q30 8 38 16" stroke="#388e3c" strokeWidth="2" fill="none" />
        <path d="M24 14 Q18 8 10 16" stroke="#388e3c" strokeWidth="2" fill="none" />
        <path d="M24 14 Q28 10 36 10" stroke="#43a047" strokeWidth="2" fill="none" />
        <path d="M24 14 Q20 10 12 10" stroke="#43a047" strokeWidth="2" fill="none" />
        <text x="24" y="31" fontSize="6" fill="#ffb300" textAnchor="middle" opacity="0.7">Goa</text>
      </svg>
    );
  // Generic landmark pin (for any other city)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="20" rx="7" ry="4" fill="#ab47bc" />
      <circle cx="16" cy="12" r="7" fill="#ce93d8" />
      <rect x="14" y="14" width="4" height="8" rx="2" fill="#6d4c41" />
      <text x="16" y="30" fontSize="6" fill="#8e24aa" textAnchor="middle" opacity="0.5">City</text>
    </svg>
  );
}
