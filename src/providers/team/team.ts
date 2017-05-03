import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class TeamProvider {
  public rootRef: firebase.database.Reference;

  constructor() {
    this.rootRef = firebase.database().ref('/');
  }

  acceptTeamMember(memberId: string, inviteId: string): firebase.Promise<any> {
    const activatedUser = {};
    activatedUser[`/invite/${inviteId}`] = null;
    activatedUser[`/teamProfile/${firebase.auth().currentUser.uid}/teamMembers/${memberId}/inactive`] = null;
    activatedUser[`/teamProfile/${firebase.auth().currentUser.uid}/teamMembers/${memberId}/inviteId`] = null;
    activatedUser[`/userProfile/${memberId}/active`] = true;
    
    return this.rootRef.update(activatedUser, (error) => {  
      if(error){ console.log(error) }
    });
  }

  getAdminStatus(): Promise<any> {
    return new Promise( (resolve, reject) => {
       firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/`)
       .child('teamAdmin').on('value', adminStatus => {
        resolve(adminStatus.val());
      });
    });
  }

  getUserProfile(): Promise<any> {
    return new Promise( (resolve, reject) => {
       firebase.database().ref(`/userProfile/${firebase.auth().currentUser.uid}/`)
       .on('value', profileSnapshot => {
        resolve(profileSnapshot.val());
      });
    });
  }

  getPendingInvitationList(): Promise<any> {
    const invitationList: Array<any> = [];
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/invite').orderByChild('teamId')
      .equalTo(firebase.auth().currentUser.uid).once('value', inviteSnapshot => {
        inviteSnapshot.forEach( snap => {
          if (!snap.val().acceptedInvite){
            invitationList.push({
              inviteId: snap.key,
              email: snap.val().email,
              fullName: snap.val().fullName,
              teamId: snap.val().teamId,
              teamName: snap.val().teamName,
              acceptedInvite: snap.val().acceptedInvite
            });
          }          
          return false;
        });
        resolve(invitationList);
      });
    });
  }

  getPendingRequestList(): Promise<any> {
    const requestList: Array<any> = [];
    return new Promise( (resolve, reject) => {
      firebase.database().ref(`/teamProfile/${firebase.auth().currentUser.uid}/`)
      .child('teamMembers').orderByChild('inactive').equalTo(true)
      .once('value', requestListSnapshot => {
        requestListSnapshot.forEach( snap => {
          requestList.push({
            userId: snap.key,
            email: snap.val().email,
            fullName: snap.val().fullName,
            inviteId: snap.val().inviteId
          });
          return false
        });
        resolve(requestList);
      });
    });
  }

  getTeamMemberList(): Promise<any> {
    const teamMeberList: Array<Object> = [];
    return new Promise( (resolve, reject) => {
      firebase.database().ref(`/teamProfile/${firebase.auth().currentUser.uid}/`)
      .child('teamMembers').on('value', teamMemberListSnapshot => {
        teamMemberListSnapshot.forEach( teamMemberListSnap => {
          if (teamMemberListSnap.key !== firebase.auth().currentUser.uid){
            teamMeberList.push({
              memberId: teamMemberListSnap.key,
              fullName: teamMemberListSnap.val().fullName,
              email: teamMemberListSnap.val().email
            });
          }
          return false
        });
        resolve(teamMeberList);
      });
    });
  }

  getTeamProfile(): Promise<any> {
    return new Promise( (resolve, reject) => {
      const teamProfile: any = {};
      firebase.database().ref(`/teamProfile/${firebase.auth().currentUser.uid}/`)
      .on('value', dataSnapshot => {
        teamProfile.teamId = dataSnapshot.key;
        teamProfile.teamName = dataSnapshot.val().teamName;
        teamProfile.adminName = dataSnapshot.val().teamMembers[dataSnapshot.val().teamAdmin].fullName;
        teamProfile.teamMembers = dataSnapshot.val().teamMembers;
        resolve(teamProfile);
      });
    });
  }

  inviteTeamMember(email: string, fullName: string, teamId: string, 
  teamName: string): firebase.Promise<any> {
    return firebase.database().ref('/invite').push({
      email,
      fullName,
      teamId, 
      teamName,
      acceptedInvite: false
    });
  }

}