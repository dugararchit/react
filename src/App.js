import React, { Component } from 'react';
import Home from './Home';
import Welcome from './Welcome';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import { Router } from "@reach/router";
import { auth } from "./firebase";
import firebase from "./firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: "",
      userId: null,
      meetings: [],
      howManyMeetings: 0
    };
    this.updateUserDetail = this.updateUserDetail.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth != null) {
        
        this.setState({
          user: userAuth,
          displayName: userAuth.displayName,
          userId: userAuth.uid
        });

        const meetingsRef = firebase
          .database()
          //.ref('meetings/' + userAuth.uid).orderByChild("created_at").startAt(1590430049675).limitToFirst(3);
          .ref('meetings/' + userAuth.uid);

        meetingsRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];
          
          for (let item in meetings) {
            meetingsList.unshift({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }

          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });
        });
      } else {
        this.setState({
          user: null,
          displayName: "",
          userId: null
        });
      }
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

  addMeeting = (meetingName) => {
    let ref = firebase.database().ref('meetings/' + this.state.userId);
    var result = { meetingName: meetingName, created_at: new Date().getTime() };
    console.log(result);
    ref.push(result);
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} signOutUser={this.signOutUser} />
        {this.state.user && <Welcome userId={this.state.userId} displayName={this.state.displayName} signOutUser={this.signOutUser} />}
        <Router>
          <Home
            meetings={this.state.meetings}
            howManyMeetings={this.state.howManyMeetings}
            addMeeting={this.addMeeting} userId={this.state.userId} path="/" displayName={this.state.displayName} />
          <Register path="/register" updateUserDetail={(user) => this.updateUserDetail(user)} />
          <Login path="/login" updateUserDetail={(user) => this.updateUserDetail(user)} />
        </Router>
      </div>
    );
  }
}

export default App;