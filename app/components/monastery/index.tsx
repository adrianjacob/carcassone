"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { ScoreContext } from "../../context/ScoreContext";

import Image from "next/image";

export default function Feature() {
  const { scores, points, setPoints } = useContext(ScoreContext);
  const [monastery, setMonastery] = useState(0);

  useEffect(() => {
    setPoints(monastery);
  }, [monastery]);

  const intervalRef = useRef(null);
  const isMouseDown = useRef(false); // Track mouse down state

  const handleMouseDown = (increment) => {
    if (!isMouseDown.current && (increment ? monastery < 9 : monastery > 0)) {
      isMouseDown.current = true;
      setMonastery((prev) => prev + (increment ? 1 : -1));

      intervalRef.current = setInterval(() => {
        setMonastery((prev) => {
          if (increment ? prev < 9 : prev > 0) {
            return prev + (increment ? 1 : -1);
          } else {
            clearInterval(intervalRef.current);
            isMouseDown.current = false;
            return prev;
          }
        });
      }, 150);
    }
  };

  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
    isMouseDown.current = false; // Reset mouse down state
  };

  return (
    <div className="p-8 pt-0 grid grid-cols-12 gap-4">
      <div className="text-2xl overflow-hidden rounded-md aspect-square border-2 flex relative text-white">
        <button
          className="flex-1 z-10 active:bg-white/25"
          onMouseDown={() => handleMouseDown(false)} // Decrement
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          -
        </button>
        <button
          className="flex-1 z-10 active:bg-white/25"
          // onClick={() => monastery < 9 && setMonastery((prev) => prev + 1)}
          onMouseDown={() => handleMouseDown(true)} // Increment
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Stop on mouse leave
        >
          +
        </button>
        <Image
          src={`/monastery.png`}
          width={150}
          height={150}
          alt="City"
          className="absolute aspect-square"
        />
        <div className="inset-0 absolute flex text-white text-5xl font-black items-center justify-center bg-slate-900/25 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          <span className={`${!monastery && "opacity-50"}`}>{monastery}</span>
        </div>
        <div className="absolute bottom-2 w-full text-center text-base font-semibold text-xs">
          TILES
        </div>
      </div>

      <div>{points}</div>
    </div>
  );
}
