import { useState } from "react";
import "./App.css";

function App() {
  const initialBoard = () => Array(9).fill(null);
  const [array, setarray] = useState(initialBoard());
  const [player, setplayer] = useState("X");
  const [turn, setturn] = useState("turn");

  const winner = () => {
    const winner = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winner.length; i++) {
      let [a, b, c] = winner[i];
      if (array[a] == array[b] && array[b] == array[c] && array[c] != null) {
        return array[a];
      }
    }
  };
  const handleChange = (e) => {

    const id = e.target.id;
    if(array[id] == null){
        array[id] = player;
        setplayer(() => (player == "X" ? "O" : "X"));
        setarray(array);
    }
    if(!array.includes(null)){
        setplayer("match");
        setturn("Draw");
    }
    const result = winner();
    if (result) {
      setplayer(result);
      setturn("Winner");
      return;
    }
  };

  const handleReset = () => {
    setarray(initialBoard());
    setplayer("X");
    setturn("turn");
  }
  return (
    <>
      <div className="main-container">
        <h1>Tic-Tac-Toe</h1>
        <h2>
          player {player} {turn}
        </h2>
        <div className="container">
          {array.map((ele, index) => {
            return (
              <div
                key={index}
                id={index}
                onClick={handleChange}
                className="block"
              >
                {ele}
              </div>
            );
          })}
        </div>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  );
}

export default App;
