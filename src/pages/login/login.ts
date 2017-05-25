import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm:FormGroup;
  constructor(public navCtrl:NavController, public loadingCtrl:LoadingController, 
    public formBuilder:FormBuilder, public authProvider:AuthProvider) {
      
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  loginUser(): void {
    const loading = this.loadingCtrl.create();
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( activeUser => {
        loading.dismiss().then( () => {
          if (activeUser === true){
            this.navCtrl.setRoot('TabsPage');
          } else {
            this.navCtrl.setRoot('WaitingPage');
          }
        })
      });
    }
    loading.present();
  }

}
