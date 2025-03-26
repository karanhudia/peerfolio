"use client";

import { useState } from "react";

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  onChange?: (rating: number) => void;
  readOnly?: boolean;
}

export function StarRating({
  rating = 0,
  maxRating = 5,
  size = "md",
  onChange,
  readOnly = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  // Determine touch-friendly spacing based on size
  const spacingClasses = {
    sm: "mr-1",
    md: "mr-1.5",
    lg: "mr-2",
  };

  const handleClick = (index: number) => {
    if (readOnly) return;
    
    const newRating = index + 1;
    setCurrentRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (readOnly) return;
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  const displayRating = hoverRating || currentRating || rating;

  return (
    <div 
      className="flex items-center" 
      role={readOnly ? "presentation" : "radiogroup"}
      aria-label={readOnly ? "Rating" : "Select a rating"}
    >
      {[...Array(maxRating)].map((_, index) => (
        <span
          key={index}
          className={`${
            index < displayRating ? "text-yellow-400" : "text-gray-300"
          } ${sizeClasses[size]} ${spacingClasses[size]} ${!readOnly && "hover:scale-110 transition-transform"} cursor-${readOnly ? "default" : "pointer"} touch-manipulation`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={!readOnly ? () => handleClick(index) : undefined}
          role={readOnly ? "presentation" : "radio"}
          aria-checked={index + 1 === displayRating}
          aria-label={`${index + 1} out of ${maxRating} stars`}
          tabIndex={readOnly ? -1 : 0}
        >
          ★
        </span>
      ))}
    </div>
  );
} 