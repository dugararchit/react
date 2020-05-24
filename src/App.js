import React, { Component } from 'react';
import Home from './Home';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import { Router } from "@reach/router";
import { auth } from "./firebase";
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.updateUserDetail = this.updateUserDetail.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth != null)
        this.setState({
          user: userAuth.displayName
        });
    });
  };

  updateUserDetail(userAuth) {
    this.setState({
      user: userAuth.displayName
    });
  }

  signOutUser(e) {
    e.preventDefault();
    alert("Signing you out!!");
    auth.signOut().then(() => {
      alert("User logout successfully.");
      this.setState({
        user: null
      });
    }).catch(function (error) {
      alert("Error while logging you out, please try after sometime");
    });
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} signOutUser={this.signOutUser} />
        {this.state.user && <Welcome user={this.state.user} signOutUser={this.signOutUser}/>}
        <Router>
          <Home path="/" user={this.state.user} />
          <Register path="/register" updateUserDetail={(user) => this.updateUserDetail(user)} />
          <Login path="/login" updateUserDetail={(user) => this.updateUserDetail(user)} />
        </Router>
      </div>
    );
  }
}

export default App;