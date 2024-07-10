import React, { useState, useEffect, ChangeEvent } from "react";
import "./styles/App.css";

const winningPattern: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [xTurn, setXTurn] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [themeDark, setThemeDark] = useState<boolean>(false);

  useEffect(() => {
    if (message && !isPopupVisible) {
      setIsPopupVisible(true);
    }
  }, [message, isPopupVisible]);

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;

    const darkTheme = {
      backgroundColor: "#2b2b2b",
      hoverBorderColor: "#ecc040",
      restartHoverBoxShadow: "#ee5a5a",
    };

    const lightTheme = {
      backgroundColor: "wheat",
      hoverBorderColor: "#ee5a5a",
      restartHoverBoxShadow: "#ecc040",
    };

    const theme = themeDark ? darkTheme : lightTheme;

    body.style.backgroundColor = theme.backgroundColor;
    root.style.setProperty("--hover-border-color", theme.hoverBorderColor);
    root.style.setProperty("--restart-hover-box-shadow", theme.restartHoverBoxShadow);
  }, [themeDark]);

  const handleCellClick = (index: number) => {
    if (board[index] != "" || message) return;
    const newBoard = board.slice();
    newBoard[index] = xTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!xTurn);

    const winner = checkWinner(newBoard);
    if (winner) {
      setMessage(`Player ${winner} Wins!`);
    } else if (!newBoard.includes("")) {
      setMessage("It's a Draw!");
    }
  };

  const checkWinner = (board: string[]): string | null => {
    for (let pattern of winningPattern) {
      const [a, b, c] = pattern;
      if (board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(""));
    setXTurn(true);
    setMessage("");
    setIsPopupVisible(false);
  };

  const toggleTheme = (event: ChangeEvent<HTMLInputElement>) => {
    setThemeDark(event.target.checked);
  };

  return (
    <div className={`app ${themeDark ? "dark" : ""}`}>
      <div className="mt-1em absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="toptitle">TicTacToe</div>
        <div className="w-[48vmin] h-[48vmin] max-w-[500px] max-h-[500px] relative flex flex-wrap gap-[3vmin] z-[2]">
          {board.map((_, index) => (
            <button
              key={index}
              className="button-option"
              onClick={() => handleCellClick(index)}
              disabled={board[index] !== "" || !!message}
            >
              {board[index]}
            </button>
          ))}
        </div>
        <button id="restart" onClick={handleRestart}>
          Restart
        </button>
      </div>
      {isPopupVisible && (
        <div className="popup">
          <p id="message">{message}</p>
          <button id="new-game" onClick={handleRestart}>
            New Game
          </button>
        </div>
      )}
      <div className="theme-frame">
        <div className="text-wrapper">Change Theme</div>
        <div className="switch">
          <input
            type="checkbox"
            id="toggle-btn"
            checked={themeDark}
            onChange={toggleTheme}
          />
          <label htmlFor="toggle-btn" id="slider"></label>
        </div>
      </div>
    </div>
  );
};

export default App;
