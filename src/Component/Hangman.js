import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Alphabets from "./Alphabets";
import Button from "./Button";
import "../style/Hangman.css";
import History from "./History";
import Spinner from "./Spinner";

let FinalWord = "";
const Hangman = (props) => {
  const [Winner, SetWinner] = useState(false);
  const [ChancesOver, SetChancesOver] = useState(false);
  const [StopTimer, SetStopTimer] = useState(false);
  const [Loading, Setloading] = useState(true);
  const Find_Letter = (Word, Input) => {
    console.log(Word, "-=> ", Input);
    let LetterArray = [];
    for (let i = 0; i < Word.length; i++) {
      if (Word[i] === Input) LetterArray.push(i);
    }
    if (LetterArray.length > 0) return LetterArray;
    else return -1;
  };

  const click = (event) => {
    console.log(event.target.id);
    let alp = event.target.id;
    let temp = props.word;

    let letter = null;
    letter = Find_Letter(temp, alp.toLowerCase());
    console.log(letter);
    if (letter !== -1) {
      for (let i = 0; i < letter.length; i++) {
        document.getElementById(letter[i]).innerHTML = alp;
        FinalWord += alp;
        console.log("Found in word.");
        console.log(temp);
      }
    } else if (letter === -1) {
      let tem = props.ctr;
      tem--;
      props.onSubCounter();
    }
    if (FinalWord.length === temp.length) {
      SetWinner(true);
      props.setWinner(true);
    }

    if (props.ctr <= 1) {
      SetChancesOver(true);
      props.setChanceOver(true);
    }
  };

  useEffect(() => {
    if (Winner) {
      SetStopTimer(true);
    }
  }, [Winner]);

  const saveGame = () => {
    Setloading(!Loading);
    try {
      console.log("No of errors=>", 8 - props.ctr);
      console.log("Status", Winner);
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const bodyData = JSON.stringify({
        date: new Date(),
        error: 8 - props.ctr,
        finish: Winner,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: bodyData,
        redirect: "follow",
      };
      fetch("http://localhost:3008/saveHistory", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          Setloading(true);
          // alert("Successfully saved.");
          console.log("success");
        })
        .catch((error) => {
          alert(error);
        });
    } catch (e) {
      alert("Something went wrong.");
    }
  };
  return (
    <div>
      {Loading ? (
        <div>
          {!Winner && !ChancesOver ? (
            <div className="container">
              <h1>Hangman</h1>
              <div style={{ float: "right", marginRight: "50px" }}>
                <Button title={"New Word"} clicked={props.RefreshFun} />
              </div>
              <h2
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignContent: "center",
                }}
              >
                {" "}
                No of Errors{" "}
                <span style={{ color: "red" }}> &nbsp;{8 - props.ctr}</span>
              </h2>
              <h2>
                {" "}
                Remaining chances{" "}
                <span style={{ color: "red" }}>{props.ctr}</span>
              </h2>
              <h2>{props.WordType}</h2>
              <div>
                {props.word.map((i, index) => {
                  return (
                    <span
                      key={i + index}
                      id={index}
                      style={{
                        borderBottom: "2px solid #567DFC",
                        padding: "10px",
                        margin: "5px",
                        width: "100px",
                      }}
                    />
                  );
                })}
              </div>
              <p style={{ margin: "10px" }}>
                Use the alphabet below to guess the word
              </p>
              <Alphabets clicked={(event) => click(event)} />
              <Button title={"Save Game"} clicked={saveGame} />
            </div>
          ) : (
            <h1>
              {ChancesOver ? (
                "Chances over"
              ) : (
                <div>
                  winner
                  <br />
                  <Button title={"Save Game"} clicked={saveGame} />
                  &nbsp;&nbsp;
                  <Button
                    title={"Refresh Game"}
                    clicked={() => {
                      window.location.reload();
                    }}
                  />
                  <br />
                  <br />
                  <History />
                </div>
              )}
            </h1>
          )}
        </div>
      ) : (
        <Spinner hideTimer={props.hideTimerFun} />
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ctr: state.Counter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSubCounter: () => dispatch({ type: "COUNT" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Hangman);
