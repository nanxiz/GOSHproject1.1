import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { LearntabsPage } from '../pages/learntabs/learntabs';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { CalenderPage } from '../pages/calender/calender';
import { WelcomePage } from '../pages/welcome/welcome';
import {UsefullinkPage}from'../pages/usefullink/usefullink';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav; 

  rootPage: any = WelcomePage;

  pages: Array<{icon:string, color:string,title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon:"paper",color:'spring',title: 'Introduction', component: HomePage },
      { icon:'filing',color:'secondary',title: 'Modules,Profile,Leaderboard', component: LearntabsPage },
      //{ icon:'calendar',color:'danger',title: 'My Calender', component: CalenderPage },
      { icon:'globe',color:'aqua',title: 'Useful Websites', component: UsefullinkPage },

      { icon:'contacts',color:'light',title: 'Key Contacts', component: ContactPage },
      //Maps
      //Forum
      //Websites
      { icon:'cog',color:'grey',title: 'Settings', component: SettingsPage },
     
  

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
