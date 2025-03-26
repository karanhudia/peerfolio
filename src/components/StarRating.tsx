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
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <span
          key={index}
          className={`${
            index < displayRating ? "text-yellow-400" : "text-gray-300"
          } ${sizeClasses[size]} cursor-${readOnly ? "default" : "pointer"}`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          role={readOnly ? "presentation" : "button"}
          aria-label={readOnly ? undefined : `Rate ${index + 1} out of ${maxRating}`}
        >
          ★
        </span>
      ))}
    </div>
  );
} 