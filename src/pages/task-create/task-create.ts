import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { TeamData } from '../../providers/team-data';
import { TaskData } from '../../providers/task-data';


@Component({
  selector: 'page-task-create',
  templateUrl: 'task-create.html'
})
export class TaskCreatePage {
  memberList: Array<Object>;
  createTaskForm: any;

  constructor(public navCtrl: NavController, public teamData: TeamData, public taskData: TaskData, 
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {

      this.createTaskForm = formBuilder.group({
        taskName: ['', Validators.required],
        teamMember: ['', Validators.required],
      });
    
    this.teamData.getTeamMemberList().then( teamList => {
      this.memberList = teamList;
    });

  }

  createTask(){
    const loading = this.loadingCtrl.create();
    if (!this.createTaskForm.valid){
      console.log(this.createTaskForm.value);
    } else {
      this.taskData.createTask(this.createTaskForm.value.taskName, this.createTaskForm.value.teamMember)
      .then( () => {
        loading.dismiss().then( () => {
          this.navCtrl.pop();
        });
      });
    }
    loading.present();
  }


}
