import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { TabsPage } from '../tabs/tabs';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { WaitingPage } from '../waiting/waiting';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authData: AuthData, 
    public loadingCtrl: LoadingController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  goToResetPassword(): void {
    this.navCtrl.push(ResetPasswordPage);
  }

  loginUser(): void {
    const loading = this.loadingCtrl.create();
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( activeUser => {
        loading.dismiss().then( () => {
          if (activeUser === true){
            this.navCtrl.setRoot(TabsPage);
          } else {
            this.navCtrl.setRoot(WaitingPage);
          }
        })
      });
    }
    loading.present();
  }
}
