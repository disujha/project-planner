import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamProvider } from '../../providers/team/team';
import { TaskProvider } from '../../providers/task/task';

@IonicPage()
@Component({
  selector: 'page-task-create',
  templateUrl: 'task-create.html',
})
export class TaskCreatePage {
  public memberList:Array<Object>;
  public createTaskForm:FormGroup;
  
  constructor(public navCtrl: NavController, public loadingCtrl:LoadingController, 
  public formBuilder:FormBuilder, public teamProvider:TeamProvider, 
  public taskProvider:TaskProvider) {
    this.createTaskForm = formBuilder.group({
        taskName: ['', Validators.required],
        teamMember: ['', Validators.required],
      });
    
  }

  ionViewDidEnter(){
    this.teamProvider.getTeamMemberList().then( teamList => {
      this.memberList = teamList;
    });
  }

  createTask(){
    const loading = this.loadingCtrl.create();
    if (!this.createTaskForm.valid){
      console.log(this.createTaskForm.value);
    } else {
      this.taskProvider.createTask(this.createTaskForm.value.taskName, 
      this.createTaskForm.value.teamMember)
      .then( () => {
        loading.dismiss().then( () => {
          this.navCtrl.pop();
        });
      });
    }
    loading.present();
  }

}
