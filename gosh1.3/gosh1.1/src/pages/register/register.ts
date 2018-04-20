import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserserviceProvider } from '../../providers/userservice/userservice'


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  })


export class RegisterPage {
  responseData: any;
    name='';
  //email: any;
  department='';
  password: '';
  email = '';
  university = '';
  //userData = {
    //'name': this.name,
    //'email': this.email,
    //'department': '4515',
    //'password': '5ace2a'
  //};
  


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public registerService: UserserviceProvider,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    let userData = {
      'name': this.name,
      'email': this.email,
      'department': this.department,
      'university': this.university,
      'password': this.password
    };

    this.registerService.postToRegister(userData).then((result) => {
      this.responseData = result;
      //let toast = this.toastCtrl.create(this.responseData);
      //toast.present();
      console.log(this.responseData);
      this.showToast(this.responseData.message);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      this.navCtrl.push(LoginPage);

    }, (err) => {
      this.showToast('email is invalid or has been registered before');
    });
   
   }
  
  login() {
    this.navCtrl.push(LoginPage);
  }
  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration:3200
    });
    toast.present();
  }

}
