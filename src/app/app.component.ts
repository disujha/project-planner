import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/statusbar';
import { Splashscreen } from '@ionic-native/splashscreen';

import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';

import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  zone: NgZone;

  constructor(platform: Platform) {
    this.zone = new NgZone({});
    firebase.initializeApp({
      apiKey: "AIzaSyADnnJGaIckHIPvCs-kz8sYlqtTwf6BEsE",
      authDomain: "my-project-planner.firebaseapp.com",
      databaseURL: "https://my-project-planner.firebaseio.com",
      storageBucket: "my-project-planner.appspot.com",
      messagingSenderId: "454503226671"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = LandingPage;
          unsubscribe();
        } else { 
          this.rootPage = TabsPage;
          unsubscribe();
        }
      });     
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}