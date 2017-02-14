import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TeamPage } from '../pages/team/team';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { IntroPage } from '../pages/intro/intro';

import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';
import { TaskData } from '../providers/task-data';
import { TeamData } from '../providers/team-data';

@NgModule({
  declarations: [
    MyApp,
    TeamPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    LandingPage,
    IntroPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamPage,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    LandingPage,
    IntroPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    ProfileData,
    TaskData,
    TeamData
  ]
})
export class AppModule {}
