"use client";
import React, { useEffect, useState } from "react";

interface TimerProps {
  totalTime: number; // in minutes
}

const Timer: React.FC<TimerProps> = ({ totalTime }) => {
  const [secondsLeft, setSecondsLeft] = useState(totalTime * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm font-medium">
      ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
