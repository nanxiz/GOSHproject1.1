import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the LearntabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-learntabs',
  templateUrl: 'learntabs.html'
})
export class LearntabsPage {

  moduleRoot = 'ModulePage'
  profileRoot = 'ProfilePage'
  leaderboardRoot = 'LeaderboardPage'


  constructor(public navCtrl: NavController) {}

}
