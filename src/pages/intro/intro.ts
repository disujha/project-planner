import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {
  @ViewChild(Slides) slides: Slides;
  getInvitationForm: any;
  signupForm: any;
  invitation: any = null;

  constructor(public navCtrl: NavController, public authData: AuthData, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController) {

    this.getInvitationForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });

    this.signupForm = formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  nextSlide(): void {
    this.slides.slideNext();
  }

  getInvitation(): void {
    const loading = this.loadingCtrl.create();
    if (!this.getInvitationForm.valid){
      console.log(this.getInvitationForm.value);
    } else {
      this.authData.getTeamInvite(this.getInvitationForm.value.email)
        .then(inviteSnapshot => {
          if (inviteSnapshot){
            this.invitation = inviteSnapshot[0];
          } else {
            console.log("No email found...");
          }
          
          loading.dismiss().then( () => { 
            this.nextSlide(); 
          });
      });
    }
    loading.present();
  }

  signupTeamMember(): void {
    const loading = this.loadingCtrl.create();
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.createMemberAccount(this.invitation.email, this.signupForm.value.password, this.invitation.teamId, this.invitation.fullName, this.invitation.teamName, this.invitation.inviteId)
        .then( () => {
          loading.dismiss().then( () => {
            this.nextSlide();
          });
      });
    }
    loading.present();
  }

}

