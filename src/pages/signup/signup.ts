import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  createTeamForm: any;

  constructor(public navCtrl: NavController, public authData: AuthData, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController) {
    this.createTeamForm = formBuilder.group({
      fullName: ['', Validators.required],
      teamName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  createTeam(){
    const loading = this.loadingCtrl.create();
    if (!this.createTeamForm.valid){
      console.log(this.createTeamForm.value);
    } else {
      this.authData.createAdminAccount(this.createTeamForm.value.email, this.createTeamForm.value.password, 
        this.createTeamForm.value.fullName, this.createTeamForm.value.teamName)
        .then( () => {
          loading.dismiss().then( () => {
            this.navCtrl.setRoot(TabsPage);
          })
        });
    }
    loading.present();
  }


}
