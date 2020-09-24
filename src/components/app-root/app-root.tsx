import { Component, h, State } from '@stencil/core';

import * as firebase from 'firebase/app';
import "firebase/firestore";
import * as firebaseui from 'firebaseui';
import { firebaseConfig } from '../../data/firebase';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {

  private db;
  private ui;
  @State() user;

  componentWillLoad() {
    if (firebase) {
      firebase.initializeApp(firebaseConfig);
      this.db = firebase.firestore();
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(`got a user:`, user);
        }
        else {
          console.log(`signed out?`);
        }
        this.user = user;
      })
    }  
  }



  signInClicked() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  signOutClicked() {
    console.log(`signing out...`);
    firebase.auth().signOut();
  }

  renderSignIn() {
    return (
      <div onClick={this.signInClicked.bind(this)}>sign in</div>
    );
  }

  renderSignOut() {
    return (
    <div onClick={this.signOutClicked.bind(this)}>Hi, {this.user.displayName}! sign out</div>
    );
  }

  render() {
    return (
      <div class="app-root">
        <header>
          <h1>Web App Poem Demo</h1>
          <stencil-route-link url="/about">
            <button>About This</button>
          </stencil-route-link>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} componentProps={{ db: this.db, user: this.user }}/>
              <stencil-route url="/about" component="app-about" />
            </stencil-route-switch>
          </stencil-router>
        </main>

        <div class="auth">
          { this.user ? this.renderSignOut() : this.renderSignIn() }
        </div>
        
      </div>
    );
  }
}
