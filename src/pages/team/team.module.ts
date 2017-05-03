import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamPage } from './team';
import { ObjectToArray } from '../../app/pipes/object-array';

@NgModule({
  declarations: [
    TeamPage,
    ObjectToArray
  ],
  imports: [
    IonicPageModule.forChild(TeamPage),
  ],
  exports: [
    TeamPage
  ]
})
export class TeamPageModule {}
