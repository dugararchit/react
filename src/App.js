import React from "react";
import "./App.css";
import Menuitems from "./menuitems";
import Home from "./home";
import { Router } from "@reach/router";


class App extends React.Component {
  
  render() {
   
    return (
      
        <Router>
          <Home path="/" />
          <Menuitems path="menuitems/" />
        </Router>
      
    );
  }
}

export default App;
