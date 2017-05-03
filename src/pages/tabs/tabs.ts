import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TeamProvider } from '../../providers/team/team';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = 'HomePage';
  tab2Root: any = 'TeamPage';
  isAdmin: boolean = false;

  constructor(public teamProvider: TeamProvider) {
    this.teamProvider.getAdminStatus().then( adminStatus => {
      this.isAdmin = adminStatus;
    });
  }
}
