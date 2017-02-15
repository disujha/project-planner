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
              [newUser.uid]: { 
                fullName: fullName,
                email: email
              }
            }
          });
        });
    });
  }

  createMemberAccount(email: string, password: string, teamId: string, fullName: string, 
    teamName: string, inviteId: string): firebase.Promise<any> {
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
          this.teamProfile.child(teamId).child('teamMembers').child(newUser.uid).set({
            fullName: fullName,
            email: email,
            inactive: true,
            inviteId: inviteId
          });
        }).then( () => {
          this.inviteRef.child(inviteId).child('acceptedInvite').set(true);
        });
    });
  }

  getTeamInvite(email: string): firebase.Promise<any> {
    return new Promise( (resolve, reject) => {
      const invitation: any = [];
      this.inviteRef.orderByChild('email').equalTo(email).limitToFirst(1)
      .once('value', inviteSanpshot => {
        inviteSanpshot.forEach( inviteSnap => {
          invitation.push({
            inviteId: inviteSnap.key,
            email: inviteSnap.val().email,
            teamId: inviteSnap.val().teamId,
            fullName: inviteSnap.val().fullName,
            teamName: inviteSnap.val().teamName
          });
          return false
        });
        resolve(invitation);
      });
    });
    
  }

  inviteTeamMember(email: string, fullName: string, teamId: string, teamName: string): firebase.Promise<any> {
    return this.inviteRef.push({
      email,
      fullName,
      teamId, 
      teamName,
      acceptedInvite: false
    });
  }

  
  loginUser(email: string, password: string): Promise<any> {
    return new Promise( (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then( user => {
        firebase.database().ref(`/userProfile/${user.uid}`)
          .once('value', userProfile => {
            resolve(userProfile.val().active);
          }); 
      });
    });
    
  }

  logoutUser(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }

  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
