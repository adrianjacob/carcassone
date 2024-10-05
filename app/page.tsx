"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { features } from "process";

export default function Home() {
  const refModal = useRef(null);

  const [scores, setScores] = useState({
    adrian: {
      selected: false,
      color: "red",
      scores: [0, 13, 55],
    },
    scott: {
      selected: false,
      color: "blue",
      scores: [0, 2, 25, 36],
    },
    tobywqewqewqewqe: {
      selected: false,
      color: "gold",
      scores: [0, 11],
    },
  });

  const [feature, setFeature] = useState({
    road: true,
    city: true,
    cathedral: false,
  });

  // maybe combine with above object - makes more sense
  const scoreMultipliers = {
    road: 2,
    city: 3,
  };

  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [tileCount, setTileCount] = useState(false);

  const handleAddScore = (points) => {
    setScores((prevScores) => {
      const updatedScores = { ...prevScores };
      for (const [name, playerScores] of Object.entries(prevScores)) {
        if (playerScores.selected) {
          const newScore = playerScores.scores.at(-1) + points;
          updatedScores[name] = {
            ...playerScores,
            scores: [...playerScores.scores, newScore],
            selected: false,
          };
        }
      }
      return updatedScores;
    });
  };

  // Check if any player is selected
  const isAnyPlayerSelected = Object.values(scores).some(
    (player) => player.selected
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log(e);
      console.log(e.target);
      if (e.target.nodeName === "DIALOG") {
        refModal.current.close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-6 gap-4 p-8">
        {Object.entries(scores).map(([name, playerScores], index) => (
          <div
            key={index}
            className={`border p-6 rounded-md cursor-pointer bg-white flex items-center flex-col font-black text-4xl uppercase transition-all border-2 ${
              playerScores.selected && "border-black"
            } ${!playerScores.selected && isAnyPlayerSelected && "opacity-25"}`}
            onClick={() => {
              setScores((prevScores) => {
                const updatedScores = { ...prevScores }; // Create a copy of the existing state
                updatedScores[name] = {
                  ...updatedScores[name], // Copy the existing player's data
                  selected: !updatedScores[name].selected,
                };
                return updatedScores;
              });
            }}
          >
            <div className="truncate w-full text-center">{name}</div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 678.13 628.16"
              className="h-24 my-4"
            >
              <path
                fill={playerScores.color}
                d="M339.07 0c-42.19 0-72.53 22.32-90.05 50.36-15.67 25.07-22.19 54.16-23.46 79.63-47.83 23.65-100.8 47.49-143.46 71.87-22.37 12.79-41.88 25.65-56.57 39.47C10.84 255.14 0 270.7 0 289.06c0 7.81 3.81 14.18 8.11 18.85 4.3 4.67 9.46 8.3 15.33 11.69 11.74 6.77 26.55 12.42 42.83 17.31 24.19 7.26 51.29 12.66 74.84 14.96-23.43 40.37-54.61 77.46-81.95 112.99C27.58 505.93 0 545.31 0 589.06c0 6.25-.07 11.13.48 16.03s1.96 11.02 6.89 15.87 10.96 6.15 15.88 6.69 9.87.47 16.22.47h174.28c12.65 0 21.92.77 31.45-5.36 9.53-6.13 13.01-14.49 19.8-26.99l.14-.25.13-.26s15.19-30.89 33.32-61.54c9.06-15.33 18.9-30.59 27.46-41.4 4.28-5.41 8.29-9.69 11.17-12.12.88-.74 1.28-.87 1.85-1.19.57.31.97.45 1.85 1.19 2.88 2.42 6.89 6.71 11.17 12.12 8.56 10.82 18.4 26.08 27.46 41.4 18.13 30.65 33.32 61.54 33.32 61.54l.12.26.14.25c6.79 12.5 10.23 20.82 19.7 26.96 9.47 6.14 18.71 5.39 31.18 5.39h175.05c6.25 0 11.12.07 16.01-.47 4.88-.54 10.93-1.89 15.81-6.77 4.87-4.88 6.23-10.93 6.77-15.81.54-4.88.48-9.76.48-16.01 0-43.75-27.58-83.13-59.17-124.2-27.33-35.53-58.52-72.62-81.95-112.99 23.56-2.31 50.65-7.7 74.84-14.96 16.28-4.88 31.09-10.53 42.83-17.3 5.87-3.39 11.03-7.02 15.33-11.69 4.3-4.67 8.11-11.04 8.11-18.85 0-18.36-10.83-33.92-25.52-47.74-14.68-13.82-34.19-26.68-56.57-39.47-42.66-24.38-95.64-48.22-143.46-71.87-1.27-25.47-7.79-54.55-23.46-79.62C411.59 22.32 381.25 0 339.07 0Z"
              />
            </svg>
            <div>
              {/* {playerScores.scores.length > 1 && ( // Conditionally render second to last score
                <span>
                  {playerScores.scores[playerScores.scores.length - 2]}
                </span>
              )} */}
              {playerScores.scores[playerScores.scores.length - 1]}
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 pt-0 grid grid-cols-12 gap-4">
        {Object.entries(feature).map(
          ([name, isActive], index) =>
            isActive && (
              <>
                <button
                  className="relative text-white font-black text-2xl overflow-hidden rounded-md aspect-square uppercase"
                  onClick={() => {
                    if (isAnyPlayerSelected) {
                      setActiveFeature((prevFeature) =>
                        prevFeature === name ? null : name
                      );
                      setTileCount(!tileCount);
                      // refModal.current.showModal();
                    } else {
                      alert("Please select at least one player");
                    }
                  }}
                >
                  <Image
                    src={`/${name}.png`}
                    width={150}
                    height={150}
                    alt={name}
                  />
                  <div className="inset-0 absolute flex items-center justify-center bg-slate-900/25 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                    {name}
                  </div>
                </button>
              </>
            )
        )}
      </div>

      {tileCount && (
        <div className="p-8 pt-0 grid grid-cols-12 gap-4">
          {Array.from({ length: 10 }, (_, index) => (
            <button
              key={index}
              className="relative text-white font-black text-6xl overflow-hidden rounded-md aspect-square uppercase bg-stone-400"
              onClick={() => {
                handleAddScore(scoreMultipliers[activeFeature] * (index + 1));
                setActiveFeature(null);
                setTileCount(false);
              }}
            >
              {/* <Image
                src={`/${activeFeature}.png`}
                width={150}
                height={150}
                alt={activeFeature}
              /> */}
              <div className="inset-0 absolute flex items-center justify-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                {index + 1}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* https://wikicarpedia.com/car/Base_game */}

      {/* <dialog ref={refModal} className="w-1/2	">
        <div className="p-8 	">
          {activeFeature === "road" && <div>ROAD</div>}
          {activeFeature === "city" && <div>CITY</div>}
          {activeFeature === "cathedral" && <div>CATHEDRAL</div>}
        </div>
      </dialog> */}

      {/* <div className="p-8 pt-0 grid grid-cols-12 gap-4">
        <button
          className="relative text-white font-black text-2xl overflow-hidden rounded-md aspect-square"
          onClick={() =>
            isAnyPlayerSelected
              ? refModal.current.showModal()
              : alert("Please select at least one player")
          }
        >
          <Image src="/road.png" width={150} height={150} alt="Road" />
          <div className="inset-0 absolute flex items-center justify-center bg-slate-900/25 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
            ROAD
          </div>
        </button>
        <dialog ref={refModal} className="p-16">
          <div>
            <button onClick={() => refModal.current.close()}>Close</button>
          </div>

          <button
            onClick={() => {
              handleAddScore(2);
              refModal.current.close();
            }}
          >
            Add score
          </button>
        </dialog>

        <button
          className="relative text-white font-black text-2xl overflow-hidden rounded-md aspect-square"
          onClick={() =>
            isAnyPlayerSelected
              ? refModal2.current.showModal()
              : alert("Please select at least one player")
          }
        >
          <Image src="/city.png" width={150} height={150} alt="Road" />
          <div className="inset-0 absolute flex items-center justify-center bg-slate-900/25 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
            CITY
          </div>
        </button>
        <dialog ref={refModal2} className="p-16">
          <div>
            <button onClick={() => refModal2.current.close()}>Close</button>
          </div>

          <button
            onClick={() => {
              handleAddScore(3);
              refModal2.current.close();
            }}
          >
            Add score
          </button>
        </dialog>
      </div> */}
    </>
  );
}
