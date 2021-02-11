import "../style/Hangman.css";
import React from "react";
const Alphabets = (props) => {
  let i = 1;
  const AlphabetsArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  return (
    <div id="buttons">
      {AlphabetsArray.map((Alphabet) => {
        if (i < 6) {
          i += 1;
          return (
            <button
              id={Alphabet}
              key={Alphabet}
              onClick={props.clicked}
              className="btn"
            >
              {Alphabet}
            </button>
          );
        } else {
          i = 1;
          return (
            <React.Fragment key={Alphabet}>
              <button id={Alphabet} onClick={props.clicked} className="btn">
                {Alphabet}
              </button>
              <br />
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};
export default Alphabets;
