import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TeamData } from '../../providers/team-data';
import { TaskData } from '../../providers/task-data';
import { TaskCreatePage } from '../task-create/task-create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isAdmin: boolean = false;
  taskList: Array<any> = [];
  userProfile: Object = {};

  constructor(public navCtrl: NavController, public taskData: TaskData, public teamData: TeamData, 
    public alertCtrl: AlertController) {}

  ionViewDidEnter(): void {
    this.teamData.getAdminStatus().then( adminStatus => {
      this.isAdmin = adminStatus;
    });

    this.taskData.getTaskList().then( taskList => {
      this.taskList = taskList;
    });

    this.teamData.getUserProfile().then( profileSnapshot => {
      this.userProfile = profileSnapshot;
    });
  }

  goToTaskCreate(): void {
    this.navCtrl.push(TaskCreatePage);
  }

  completeTask(task): void {
    let confirm = this.alertCtrl.create({
      title: 'Are you done?',
      message: 'Hit OK to mark this task as completed.',
      buttons: [
        {
          text: 'OK',
          handler: () => { 
            this.taskData.completeTask(task.taskId).then( () => {
              task.completed = true;
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
