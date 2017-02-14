import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthData {
  public userProfile: firebase.database.Reference;
  public teamProfile: firebase.database.Reference;
  public inviteRef: firebase.database.Reference;

  constructor() {
    this.inviteRef = firebase.database().ref('/invite');
    this.userProfile = firebase.database().ref('/userProfile');
    this.teamProfile = firebase.database().ref('/teamProfile');
  }

  createAdminAccount(email: string, password: string, fullName: string, teamName: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then( newUser => {
      this.userProfile.child(newUser.uid)
        .set({
          email,
          fullName,
          teamId: newUser.uid,
          teamName,
          teamAdmin: true
        }).then( () => {
          this.teamProfile.child(newUser.uid).set({
            teamName,
            teamAdmin: newUser.uid,
            teamMembers: {
              [newUser.uid]: { fullName: fullName }
            }
          });
        });
    });
  }

  createMemberAccount(email: string, password: string, teamId: string, fullName: string, teamName){
    return firebase.auth().createUserWithEmailAndPassword(email, password).then( newUser => {
      this.userProfile.child(newUser.uid)
        .set({
          email,
          fullName,
          teamId,
          teamName,
          teamAdmin: false,
          active: false
        }).then( () => {
          this.teamProfile.child(teamId).child('teamMembers').child(newUser.uid)
            .set({ fullName: fullName});
        });
    });
  }

  getTeamInvite(email: string): firebase.database.Reference {
    return this.inviteRef.child(email);
  }

  inviteTeamMember(email: string, teamId: string, teamName: string){
    this.inviteRef.child(email).set({ teamId, teamName });
  }

  
  loginUser(email: string, password: string): firebase.Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logoutUser(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
