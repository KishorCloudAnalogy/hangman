import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import random_no from "../Functions/random_no";
import Timer from "./Timer";

const Home = (props) => {
  const Animal = ["ox", "cat", "donkey", "rat"];
  const Food = ["sandwitch", "burger", "cheese"];
  const TypeArray = ["Animal", "Food"];
  const [Types, SetTypes] = useState(null);
  const [word, setWord] = useState([]);
  const [Refresh, SetRefresh] = useState(false);
  const [TimerSeconds, SetTimerSeconds] = useState(100);

  let count = 8;
  const RefreshHandler = () => {
    SetRefresh(!Refresh);
    props.onResetCounter();
    console.log("refresh");
  };

  useEffect(() => {
    let Type = random_no(TypeArray.length);
    SetTimerSeconds(100);
    let WordPositon = null;
    let temp = null;
    console.log(Type);
    switch (Type) {
      case 0:
        WordPositon = random_no(Animal.length);
        temp = Animal[WordPositon].split("");
        setWord(temp);
        SetTypes(Type);
        break;
      case 1:
        WordPositon = random_no(Food.length);
        temp = Food[WordPositon].split("");
        setWord(temp);
        SetTypes(Type);
        break;
    }
  }, [Refresh]);

  return (
    <Timer
      WordType={TypeArray[Types]}
      word={word}
      Count={count}
      initialSeconds={TimerSeconds}
      RefreshFun={RefreshHandler}
      Refresh={Refresh}
    />
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
    onResetCounter: () => dispatch({ type: "RESETCOUNTER" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
