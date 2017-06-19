import React, { Component } from 'react';
import fire from '../fire';
import firebase from 'firebase';

import './SignIn.css';

var provider = new firebase.auth.GoogleAuthProvider();

class SignIn extends Component {

    handleSetUsername = (userName, userPhoto, userID) => {
        this.props.setUserName(userName, userPhoto, userID);
    }

    googleSignIn = () => {
        let that = this;
        fire.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(result);
            that.handleSetUsername(user.displayName, user.photoURL, user.uid);

            }).catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // The email of the user's account used.
            // var email = error.email;
            // // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
        });
    }

    render() {
        return (
            <div className="signIn">
                <h1>Sign-in</h1>
                <img src="googsignin.png" alt="Sign in with Google" onClick={this.googleSignIn} />
            </div>
        );
    }
}

export default SignIn;