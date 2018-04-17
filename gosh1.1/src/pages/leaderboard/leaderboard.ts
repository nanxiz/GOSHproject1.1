import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ModuleserviceProvider } from '../../providers/moduleservice/moduleservice';
import { UserserviceProvider } from '../../providers/userservice/userservice'

/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {
  allPoints:any;
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public allUsersPointsService: UserserviceProvider

   // public moduleservise: ModuleserviceProvider,

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
    this.getAllUsersPoints();
    this.allPoints = this.allPoints;
   // users = JSON.parse(JSON.stringify(users));

    //this.allPoints = JSON.parse(this.all);
    //this.allPoints.users = JSON.parse(this.allPoints.users);
    //this.allPoints = this.rankPoints(users);
    console.log(this.allPoints);

  }
  rankPoints(points: any):any {
    points.sort();
    return points.slice(1, 6);

  }

  getAllUsersPoints() {
    let usersPoint: any;
    this.allUsersPointsService.getAllUserDetail().then((result) => {
     // this.allPoints = result;
      result = JSON.parse(JSON.stringify(result));
      let user:any
      user = result;
     // user = JSON.parse(user);

      //this.allPoints.
      user = this.rankPoints(user.users);
      console.log(user);

      //let toast = this.toastCtrl.create(this.responseData);
      //toast.present();
      //this.showToast(this.responseData.message);
      localStorage.setItem('allPoints', JSON.stringify(user));
      //this.navCtrl.push(LoginPage);

    }, (err) => {
      //this.showToast('email is invalid or has been registered before');
      //allert("Failed loading modules");
      });

    this.allPoints = JSON.parse(localStorage.getItem('allPoints'));


  }



}
