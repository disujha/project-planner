import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController) {}

  goToLogin(): void {
    this.navCtrl.push('LoginPage');
  }

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }
  
  goToIntro(): void {
    this.navCtrl.push('IntroPage');
  }

}
