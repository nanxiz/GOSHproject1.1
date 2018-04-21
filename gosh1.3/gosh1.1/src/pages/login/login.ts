import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { UserserviceProvider } from '../../providers/userservice/userservice';
   


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
  name = '';
  userID:any;
  password='';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams ,
    public loginService: UserserviceProvider,
    private toastCtrl: ToastController,

) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  registerPage() {
    this.navCtrl.push(RegisterPage);

  }
  login() {
    let userData = {
      "name": this.name,
      
      "password": this.password
    };

    console.log(userData);
    
    this.loginService.postToLogin(userData).then((result) => {
      console.log(result);
      let responseData:any;
      responseData = result;
      //let toast = this.toastCtrl.create(this.responseData);
      //toast.present();
      console.log(responseData);
      this.showToast(responseData.message);
      localStorage.setItem('userID', JSON.stringify(responseData));
      //this.navCtrl.push(LoginPage);

    }, (err) => {
      this.showToast('email is invalid or has been registered before');
    });
    
    this.userID = JSON.parse(localStorage.getItem('userID'));
    console.log(this.userID);
    this.userID = this.userID.id;
    this.loginService.changeUserID(this.userID);


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
  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration:3200
    });
    toast.present();
  }


}
