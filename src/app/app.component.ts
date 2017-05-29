import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    firebase.initializeApp({
      apiKey: "AIzaSyADnnJGaIckHIPvCs-kz8sYlqtTwf6BEsE",
      authDomain: "my-project-planner.firebaseapp.com",
      databaseURL: "https://my-project-planner.firebaseio.com",
      storageBucket: "my-project-planner.appspot.com",
      messagingSenderId: "454503226671"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
        if (!user) {
          this.rootPage = 'LandingPage';
          unsubscribe();
        } else {
          firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}`)
          .once('value', userProfile => {
            if (userProfile.val().active === true){
              this.rootPage = 'TabsPage';
            } else {
              this.rootPage = 'WaitingPage';
            }
          }); 
          unsubscribe();
        }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
