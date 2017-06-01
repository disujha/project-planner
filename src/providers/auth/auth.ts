import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor() {}

  createAdminAccount(email: string, password: string, fullName: string, 
    teamName: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( newUser => {
      firebase.database().ref('/userProfile').child(newUser.uid)
        .set({
          email,
          fullName,
          teamId: newUser.uid,
          teamName,
          teamAdmin: true,
          active: true
        }).then( () => {
          firebase.database().ref('/teamProfile').child(newUser.uid).set({
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
    }, error => {
      console.log(error);
    });
  }

  createMemberAccount(email: string, password: string, teamId: string, fullName: string, 
    teamName: string, inviteId: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then( newUser => {
      firebase.database().ref('/userProfile').child(newUser.uid)
        .set({
          email,
          fullName,
          teamId,
          teamName,
          teamAdmin: false,
          active: false
        }).then( () => {
          firebase.database().ref('/teamProfile').child(teamId).child('teamMembers')
          .child(newUser.uid).set({
            fullName: fullName,
            email: email,
            inactive: true,
            inviteId: inviteId
          });
        }).then( () => {
          firebase.database().ref('/invite').child(inviteId).child('acceptedInvite').set(true);
        });
    });
  }

  getTeamInvite(email: string): firebase.Promise<any> {
    return new Promise( (resolve, reject) => {
      const invitation: any = [];
      firebase.database().ref('/invite').orderByChild('email').equalTo(email).limitToFirst(1)
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

  logoutUser(): firebase.Promise<void> {
    return firebase.auth().signOut();
  }

  resetPassword(email: string): firebase.Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

}
