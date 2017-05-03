import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm:FormGroup;
  constructor(public navCtrl:NavController, public alertCtrl:AlertController, 
    public formBuilder:FormBuilder, public authProvider:AuthProvider) {

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    });
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.authProvider.resetPassword(this.resetPasswordForm.value.email).then( () => {
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
