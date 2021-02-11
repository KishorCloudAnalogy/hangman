import logo from "./logo.svg";
import "./style/App.css";
import Home from "./Component/home";
import React from "react";
import Spinner from "./Component/Spinner";

function App() {
  return (
    <div className="App">
      <Home />
      {/* <Spinner /> */}
    </div>
  );
}

export default App;
