// ScoreContext.js
import { createContext, useState } from "react";

export const ScoreContext = createContext(null);

export const ScoreProvider = ({ children }) => {
  // Set points that get added to score
  const [points, setPoints] = useState(0);

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
      scores: [0, 11, 12],
    },
  });

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

  const contextValue = {
    points,
    setPoints,
    scores,
    setScores,
    handleAddScore,
  };

  return (
    <ScoreContext.Provider value={contextValue}>
      {children}
    </ScoreContext.Provider>
  );
};
