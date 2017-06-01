import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TeamProvider } from '../../providers/team/team';
import { TaskProvider } from '../../providers/task/task';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public isAdmin: boolean = false;
  public taskList: Array<any> = [];
  public userProfile: Object = {};

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
  public teamProvider: TeamProvider, public taskProvider: TaskProvider) {}

  ionViewDidLoad(){
    this.teamProvider.getAdminStatus().then( adminStatus => {
      this.isAdmin = adminStatus;
    });

    this.taskProvider.getTaskList().then( taskList => {
      this.taskList = taskList;
    });

    this.teamProvider.getUserProfile().then( profileSnapshot => {
      this.userProfile = profileSnapshot;
    });
  }

  goToTaskCreate(): void {
    this.navCtrl.push('TaskCreatePage');
  }

  completeTask(task): void {
    let confirm = this.alertCtrl.create({
      title: 'Are you done?',
      message: 'Hit OK to mark this task as completed.',
      buttons: [
        {
          text: 'OK',
          handler: () => { 
            this.taskProvider.completeTask(task.taskId).then( () => {
              task.completed = true;
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
