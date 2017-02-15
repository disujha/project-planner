import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { TeamPage } from '../team/team';

import { TeamData } from '../../providers/team-data';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = TeamPage;
  isAdmin: boolean = false;

  constructor(public teamData: TeamData) {
    this.teamData.getAdminStatus().then( adminStatus => {
      this.isAdmin = adminStatus;
    });
  }
}
