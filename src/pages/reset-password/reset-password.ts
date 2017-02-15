import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  resetPasswordForm: any;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public authData: AuthData, 
    public alertCtrl: AlertController) {
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    });
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email).then( () => {
        const alert = this.alertCtrl.create({
          title: 'Your email is on the way!',
          subTitle: 'We just sent you an email with instructions to retrieve your password.',
          buttons: [
            {
              text: 'OK',
              handler: data => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      });
    }
  }

}
