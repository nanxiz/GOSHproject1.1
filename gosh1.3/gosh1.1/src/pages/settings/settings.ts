import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, AlertController  } from 'ionic-angular';
import { UserserviceProvider } from '../../providers/userservice/userservice'
import{LoginPage}from'../login/login';
import {EmailComposer}from'@ionic-native/email-composer';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  password:any;
  userInfo:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,    
    private profileService: UserserviceProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private emailcomposer:EmailComposer

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.userInfo = JSON.parse(localStorage.getItem('profile'));

  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3300
    });
    toast.present();
  }
  alertUpdatePassword(){
    let password = '';
    const editAlert = this.alertCtrl.create({
      title: "Enter new password",
      inputs: [{
        name: "password",
        type: "password"
      }],
      buttons: [{
        text: "ADD",
        handler: data => {
          if (data.password.trim().length>=5) {
            console.log(data.password);
            this.updateProperty(data.password, "password");
         
          } else {
            alert("Password is too short");
          }
        }
      }]   
    });
    editAlert.present();
  }

  emailFeedBack(){
      let email={
        to:'nanxigz@gmail.com',
        subject:'User feedback to GOSH UE',
        body:'Hello <br>',
        isHtml: true,

      };

      this.emailcomposer.open(email);
  }


  updateProperty(newValue:string,property:string) {
    this.profileService.updateUserDetail(property, newValue).then((result) => {
    let responseData: any;
    responseData = result;
    console.log(responseData);
    this.showToast(responseData.message);
    if (responseData.message.indexOf("updated") != -1) {
      console.log("updated")
      this.updateDisplayedPropertyAndLocalstore(newValue, property);
    }
    }, (err) => {
      this.showToast('No connect to the server');
    }); 
  }

  updateDisplayedPropertyAndLocalstore(newValue: string, property: string) {
    if (property.indexOf("password") != -1) {
      this.password = newValue;
      this.userInfo.user.password=newValue;

    }
    

    localStorage.setItem('profile', JSON.stringify(this.userInfo));

  }

  logOffAlert(){
    const logoff = this.alertCtrl.create({
      title: "Are you sure you want to Log off?",
      
      buttons: [{
        text: "YES",
        handler:() => {
          this,this.navCtrl.push(LoginPage);
          this.showToast("You are now Logged off");
        }
      }]
    });
    logoff.present();
  }
}
