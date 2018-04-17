import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { UserserviceProvider } from '../../providers/userservice/userservice'



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public liusername = "josh";
  public liemail = "josh.test.com";
  public lidepartment = "pineapple";
  public liuniversity = "UCL";
  constructor(public navCtrl: NavController, public navParams: NavParams ,public loginService: UserserviceProvider,
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  registerPage() {
    this.navCtrl.push(RegisterPage);
  }
  login() {
    //post to login and TO change user id in provider here


    this.loginService.getUserdetail().then((result) => {
      let profile = result;
      console.log(profile);

      //let toast = this.toastCtrl.create(this.responseData);
      //toast.present();
      //this.showToast(this.responseData.message);
      localStorage.setItem('profile', JSON.stringify(profile));
      //this.navCtrl.push(LoginPage);

    }, (err) => {
      //this.showToast('email is invalid or has been registered before');
      //allert("Failed loading modules");
      });

    this.navCtrl.setRoot(HomePage);
  }



}
