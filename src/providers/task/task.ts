import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class TaskProvider {
  public taskRef: firebase.database.Reference;
  public userId: string;
  
  constructor() {
    this.userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/teamId`).on('value', teamId => {
      this.taskRef = firebase.database().ref(`/taskByTeam/${teamId.val()}`);
    });
  }

  createTask(taskName: string, memberId: string): firebase.Promise<any> {
    return firebase.database().ref(`/userProfile/${memberId}/`).once('value', profileSnapshot => {
      this.taskRef.push({
        taskName,
        memberId,
        memberName: profileSnapshot.val().fullName,
        memberEmail: profileSnapshot.val().email,
        completed: false
      });
    });
  }

  getTaskList(): Promise <any> {
    let taskList: Array<any> = [];
    return new Promise( (resolve, reject) => {

      firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/`)
      .once('value', profileSnapshot => {
        
        firebase.database().ref(`/taskByTeam/${profileSnapshot.val().teamId}`)
        .once('value', taskListSnapshot => {
          taskList = [];
          if (profileSnapshot.val().teamAdmin === true){
            taskListSnapshot.forEach( taskListSnap => {
              taskList.push({
                taskId: taskListSnap.key,
                taskName: taskListSnap.val().taskName,
                memberId: taskListSnap.val().memberId,
                memberName: taskListSnap.val().memberName,
                memberEmail: taskListSnap.val().memberEmail,
                completed: taskListSnap.val().completed
              });
              return false
            });
          } else {
            taskListSnapshot.forEach( taskListSnap => {
              if (taskListSnap.val().memberId === this.userId){
                taskList.push({
                  taskId: taskListSnap.key,
                  taskName: taskListSnap.val().taskName,
                  memberId: taskListSnap.val().memberId,
                  memberName: taskListSnap.val().memberName,
                  completed: taskListSnap.val().completed
                });
              }
              return false
            });
          }
          resolve(taskList);
          });
        });
      });
  }

  completeTask(taskId): firebase.Promise<any> {
    return this.taskRef.child(taskId).child('completed').set(true);
  }

}
