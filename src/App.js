import React, { Component } from 'react';
import fire from './fire';
import firebase from 'firebase';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import './App.css';

import NavigationBar from './components/NavigationBar';
import ClockFace from './components/ClockFace';
import SessionLogs from './components/SessionLogs';
import About from './components/About';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sessionLogs: [],
      currentUser: null,
      currentUserPhoto: null,
      currentUserID: null,
    }
  }

  componentWillMount = () => {
    this.setUpFirebase();
  }

  setUpFirebase = () => {
    let curUser;
    let curUserPhoto;
    let curUserID;
    let that = this;
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        curUser = user.displayName;
        curUserPhoto = user.photoURL;
        curUserID = user.uid;
        that.setState({
          currentUser: curUser,
          currentUserPhoto: curUserPhoto,
          currentUserID: curUserID
        });
                /* ref for firebase database */
        let logsRef = fire.database().ref(that.state.currentUserID + 'logs');

        logsRef.on('child_added', snapshot => {
          // Update react state when log is added to database
          let log = snapshot.val();
          that.setState({
            sessionLogs: [log, ...that.state.sessionLogs],
          })
        });

        logsRef.on('child_removed', snapshot => {
          // Update react state when log is added to database
          let log = snapshot.val();
          let logIndex = that.state.sessionLogs.indexOf(log);
          let tempArray = that.state.sessionLogs.splice(logIndex,1);
          that.setState({
            sessionLogs: tempArray
          });
        });
      } else {
        // No user is signed in.
      }
    });
  }


  pushLogItem = (item) => {
    fire.database().ref(this.state.currentUserID + 'logs').push(item);
  }

  // TODO - !!! How to structure log in so user persists and firebase takes care of it...
  // PROBABLY DB rules
  setUserName = (userName, userPhoto, userID) => {
    this.setState({
      currentUser: userName,
      currentUserPhoto: userPhoto,
      currentUserID: userID
    }, () => this.setUpFirebase());
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.setUserName(null, null, null);
      this.setState({sessionLogs: null});
    });
  }



  render() {
    let mainPageDisplay = null;

    // VIEW IF LOGGED IN
    if (this.state.currentUser) {
      mainPageDisplay = (
        <Switch>
          <Route exact path="/" render={(props) => {
            return (
              <div>
                <ClockFace pushLogItem={this.pushLogItem} {...props} />
                <SessionLogs logs={this.state.sessionLogs} {...props} />
              </div>
              )}} />
          <Route path="/stats" render={(props) => <SessionLogs logs={this.state.sessionLogs} {...props} />} />
          <Route path="/about" render={(props) => <About />} />
          <Route path="/sign-in" render={(props) => <SignIn setUserName={this.setUserName} />} />
          <Route component={NotFound} />
        </Switch>
      );
    } else { //VIEW IF LOGGED OUT
      mainPageDisplay = (
      <Route render={(props) => <SignIn setUserName={this.setUserName} />} />
      );
    }



    return (
      <BrowserRouter>
        <div className="root">
          <NavigationBar
            currentUser={this.state.currentUser}
            profileURL={this.state.currentUserPhoto}
            signOut={this.signOut} />
          {mainPageDisplay}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
