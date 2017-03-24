import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TeamPage } from '../pages/team/team';
import { HomePage } from '../pages/home/home';
import { LandingPage } from '../pages/landing/landing';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { IntroPage } from '../pages/intro/intro';
import { WaitingPage } from '../pages/waiting/waiting';
import { TaskCreatePage } from '../pages/task-create/task-create';

import { AuthData } from '../providers/auth-data';
import { TaskData } from '../providers/task-data';
import { TeamData } from '../providers/team-data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ObjectToArray } from './pipes/object-array';

@NgModule({
  declarations: [
    MyApp,
    TeamPage,
    TaskCreatePage,
    HomePage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    LandingPage,
    IntroPage,
    WaitingPage,
    ObjectToArray
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TeamPage,
    TaskCreatePage,
    HomePage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    LandingPage,
    IntroPage,
    WaitingPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    TaskData,
    TeamData,
    StatusBar,
    SplashScreen
  ]
})
export class AppModule {}