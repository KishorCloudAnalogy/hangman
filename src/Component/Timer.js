import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Hangman from "./Hangman";
import Button from "./Button";
import History from "./History";

const Timer = (props) => {
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [chanceOver, setChanceOver] = useState(false);
  const [Winner, setWinner] = useState(false);
  const [hide, sethide] = useState(false);
  const hideTimerHandler = () => {
    console.log("hide");
    sethide(true);
  };

  let myInterval = null;
  useEffect(() => {
    myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });
  // useEffect(() => {
  //   console.log(props.Refresh);
  //   // if (props.Refresh) {
  //
  //   clearInterval(myInterval);
  //   setSeconds(30);
  //   myInterval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //       // console.log(props.Count)
  //     }
  //     if (seconds === 0) {
  //       if (minutes === 0) {
  //         clearInterval(myInterval);
  //       } else {
  //         setMinutes(minutes - 1);
  //         setSeconds(59);
  //       }
  //     }
  //   }, 1000);
  //
  //   return () => {
  //     clearInterval(myInterval);
  //   };
  //   // }
  // }, [props.Refresh]);

  return (
    <div id="Timer">
      {(minutes === 0 && seconds === 0 && !Winner) ||
      (chanceOver && !Winner) ? (
        <div>
          <h1>Game Over please try again</h1>
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
      ) : (
        <>
          {!chanceOver && !Winner && !hide ? (
            <h1 style={{ color: "red" }}>
              {" "}
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          ) : null}

          <Hangman
            WordType={props.WordType}
            word={props.word}
            Count={props.Count}
            Seconds={seconds}
            RefreshFun={props.RefreshFun}
            setChanceOver={(check) => {
              setChanceOver(check);
            }}
            setWinner={() => {
              setWinner(true);
            }}
            hideTimerFun={hideTimerHandler}
          />
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ctr: state.Counter,
  };
};
export default connect(mapStateToProps)(Timer);
