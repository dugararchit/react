import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Home';
import Dashboard from './Dashboard';
import Navigation from './Navigation';
import { Router } from "@reach/router"
class App extends Component {
  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Router>
          <Home path="/" />
          <Dashboard path="/dashboard" />
        </Router>
      </div>
    );
  }
}

export default App;