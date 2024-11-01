"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { ScoreContext } from "../../context/ScoreContext";

import Image from "next/image";

export default function Feature() {
  const { scores, points, setPoints } = useContext(ScoreContext);
  const [city, setCity] = useState(0);
  const [shield, setShield] = useState(0);
  const [cathedral, setCathedral] = useState(false);

  useEffect(() => {
    const multiplier = cathedral ? 3 : 2;
    setPoints(city * multiplier + shield * multiplier);
  }, [city, shield, cathedral]);

  return (
    <div className="p-8 pt-0 grid grid-cols-12 gap-4">
      <div className="text-2xl overflow-hidden rounded-md aspect-square border-2 flex relative text-white">
        <button
          className="flex-1 z-10 active:bg-white/25"
          onClick={() => city > 0 && setCity((prev) => prev - 1)}
        >
          -
        </button>
        <button
          className="flex-1 z-10 active:bg-white/25"
          onClick={() => setCity((prev) => prev + 1)}
        >
          +
        </button>
        <Image
          src={`/city.png`}
          width={150}
          height={150}
          alt="City"
          className="absolute aspect-square"
        />
        <div className="inset-0 absolute flex text-white text-5xl font-black items-center justify-center bg-slate-900/25 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          <span className={`${!city && "opacity-50"}`}>{city}</span>
        </div>
        <div className="absolute bottom-2 w-full text-center text-base font-semibold text-xs">
          CITY TILES
        </div>
      </div>
      <div className="text-2xl overflow-hidden rounded-md aspect-square border-2 flex relative text-white">
        <button
          className="flex-1 z-10 active:bg-white/25"
          onClick={() => shield > 0 && setShield((prev) => prev - 1)}
        >
          -
        </button>
        <button
          className="flex-1 z-10 active:bg-white/25"
          onClick={() => setShield((prev) => prev + 1)}
        >
          +
        </button>
        <Image
          src={`/shield.png`}
          width={150}
          height={150}
          alt="City"
          className="absolute aspect-square"
        />
        <div className="inset-0 absolute flex text-white text-5xl font-black items-center justify-center bg-slate-900/25 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          <span className={`${!shield && "opacity-50"}`}>{shield}</span>
        </div>
        <div className="absolute bottom-2 w-full text-center text-base font-semibold text-xs">
          SHIELD ICONS
        </div>
      </div>
      <div className="text-2xl overflow-hidden rounded-md aspect-square border-2 flex relative text-white">
        <button
          className="flex-1 z-10 active:bg-white/25"
          onClick={() => setCathedral((cathedral) => !cathedral)}
        ></button>
        <Image
          src={`/cathedral.png`}
          width={150}
          height={150}
          alt="City"
          className="absolute aspect-square	"
        />
        <div className="inset-0 absolute flex text-white text-5xl font-black items-center justify-center bg-slate-900/25 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
          <span className={`${!cathedral && "opacity-50"}`}>
            {cathedral ? "ON" : "OFF"}
          </span>
        </div>
        <div className="absolute bottom-2 w-full text-center text-base font-semibold text-xs">
          CATHEDRAL
        </div>
      </div>

      <div>{points}</div>

      {/* // <ul>
      //   {Object.entries(scores).map(([name, player]) => (
      //     <li key={name}>
      //       {name}: {player.scores.join(", ")}
      //     </li>
      //   ))}
      // </ul> */}

      {/* <button onClick={() => handleAddScore(2)}>ADD SCORE</button> */}
    </div>
  );
}
