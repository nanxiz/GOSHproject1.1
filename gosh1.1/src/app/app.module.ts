import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { LearntabsPage } from '../pages/learntabs/learntabs';
//import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { ModuleleaderPage } from '../pages/moduleleader/moduleleader';
//import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppsettingProvider } from '../providers/appsetting/appsetting';
import { UserserviceProvider } from '../providers/userservice/userservice';
import { ModuleserviceProvider } from '../providers/moduleservice/moduleservice';
import { ModuledetailPage } from '../pages/moduledetail/moduledetail';
import { QuizPage } from '../pages/quiz/quiz';
import { CalenderPage } from '../pages/calender/calender';
import { WelcomePage } from '../pages/welcome/welcome'

//import { Calendar } from '@ionic-native/Calendar';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactPage,
    ModuleleaderPage,
    LearntabsPage,
    //LeaderboardPage,
    //ModulePage,
    //ProfilePage,
    SettingsPage,
    LoginPage,
    RegisterPage,
    ModuledetailPage,
    QuizPage,
    CalenderPage,
    WelcomePage
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //LeaderboardPage,
    //ModulePage,
    //ProfilePage,
    HomePage,
    ModuleleaderPage,
    ContactPage,
    LearntabsPage,
    SettingsPage,
    LoginPage,
    RegisterPage,
    ModuledetailPage,
    QuizPage,
    CalenderPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppsettingProvider,
    UserserviceProvider,
    ModuleserviceProvider
  ]
})
export class AppModule {}
