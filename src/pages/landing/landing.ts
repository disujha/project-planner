import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { IntroPage } from '../intro/intro';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  constructor(public navCtrl: NavController) {}

  goToLogin(): void {
    this.navCtrl.push(LoginPage);
  }

  goToSignup(): void {
    this.navCtrl.push(SignupPage);
  }
  
  goToIntro(): void {
    this.navCtrl.push(IntroPage);
  }

}