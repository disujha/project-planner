import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TeamProvider } from '../../providers/team/team';


@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {
  public teamProfile:any;
  public pendingInvitationList:any;
  public pendingRequestList:any;

  constructor(public navCtrl:NavController, public alertCtrl:AlertController, 
  public teamProvider:TeamProvider) {}

  ionViewDidLoad() {
    this.getTeamProfile();
    this.getPendingInvitationList();
    this.getPendingRequestList();
  }

  acceptTeamMember(memberId: string, inviteId: string, memberName: string): void {
    let alert = this.alertCtrl.create({
      title: 'Accept Team Member',
      message: `Are you sure you want to accept ${memberName} into your team`,
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'YES',
          handler: data => {
            this.teamProvider.acceptTeamMember(memberId, inviteId).then( () => { 
              this.getPendingRequestList(); 
            });
          }
        }
      ]
    });
    alert.present();
  }

  getPendingInvitationList(){
    this.teamProvider.getPendingInvitationList().then( pendingInvitationList => {
      this.pendingInvitationList = pendingInvitationList;
    });
  }

  getPendingRequestList(){
    this.teamProvider.getPendingRequestList().then( pendingRequestList => {
      this.pendingRequestList = pendingRequestList;
    });
  }

  getTeamProfile(){
    this.teamProvider.getTeamProfile().then( teamProfileSnapshot => {
      this.teamProfile = teamProfileSnapshot;
    });
  }

  inviteTeamMember(): void {
    let prompt = this.alertCtrl.create({
      title: 'Invite a team member',
      message: "Enter your coworker's email to send an invitation to use the app.",
      inputs: [
        {
          name: 'name',
          placeholder: "Your coworker's name",
          type: 'text'
        },
        {
          name: 'email',
          placeholder: "Your coworker's email",
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.teamProvider.inviteTeamMember(data.email, data.name, this.teamProfile.teamId, 
              this.teamProfile.teamName).then( () => { this.getPendingInvitationList(); });
          }
        }
      ]
    });
    prompt.present();
  }

}
