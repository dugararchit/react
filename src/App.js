// Import React
import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Router } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.css';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
const App = () => {
  return (
    <Router>
      {/* <Route path="/" exact component={Join}></Route>
      <Route path="/chat" exact component={Chat}></Route> */}
      <Join path="/" />
      <Chat path="chat" />
    </Router>
  )
}

export default App;
