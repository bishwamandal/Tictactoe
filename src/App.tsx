import React, { useState, useEffect, ChangeEvent } from "react";
import "./App.css";

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
    if (message) {
      setIsPopupVisible(true);
    }
  }, [message]);

  useEffect(() => {
    if (themeDark) {
      document.body.style.backgroundColor = "#2b2b2b";
      document.documentElement.style.setProperty("--hover-border-color", "#ecc040");
      document.documentElement.style.setProperty("--restart-hover-box-shadow", "#ee5a5a");
    } else {
      document.body.style.backgroundColor = "wheat";
      document.documentElement.style.setProperty("--hover-border-color", "#ee5a5a");
      document.documentElement.style.setProperty("--restart-hover-box-shadow", "#ecc040");
    }
  }, [themeDark])

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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
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
      <div className="wrapper">
        <div className="toptitle">TicTacToe</div>
        <div className="container">
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
