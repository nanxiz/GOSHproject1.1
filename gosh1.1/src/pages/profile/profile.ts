import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';
import { UserserviceProvider } from '../../providers/userservice/userservice'


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  imageUrl: string = 'assets/imgs/userinit.jpg';
  userInfo: any;
  name: any;
  points: any;
  email: any;
  level: any;
  department: any;
  updated: boolean;

  //need to add university
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileService: UserserviceProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUserInfo();
    this.userInfo = this.userInfo.user;
    console.log(this.userInfo);
    this.name = this.userInfo.name;
    this.points = this.userInfo.points;
    this.department = this.userInfo.department;
    this.email = this.userInfo.email;
    this.level = this.userInfo.level;
    this.updated = false;


  }
  //每次加载需重取得一次，err（不然）才使用local

  getUserInfo() {
    //先get再用

    this.userInfo = JSON.parse(localStorage.getItem('profile'));
  }


  alertUpdateDepartment() {
    let department = '';
    const editAlert = this.alertCtrl.create({
      title: "Enter new department",
      inputs: [{
        name: "department",
        type: "text"
      }],
      buttons: [{
        text: "ADD",
        handler: data => {
          if (data.department.trim().length>=1) {
            console.log(data.department);
            this.updateProperty(data.department, "department");
         
          } else {
            alert("input can not be empty invalid");
          }
        }
      }]
    });
    editAlert.present();


  }
 
  alertUpdateEmail() {
    let email = '';
    const editAlert = this.alertCtrl.create({
      title: "Please enter new e-mail address",
      inputs: [{
        name: "email",
        placeholder: "example: josh@email.com",
        type: "text"
      }],
      buttons: [{
        text: "ADD",
        handler: data => {
          if (data.email.indexOf("@") != -1) {
            console.log(data.email);
            this.updateProperty(data.email,"email");
          } else {
            alert("E-mail invalid");
          }
        }
      }]
    });
    editAlert.present();
  }



  updateProperty(newValue:string,property:string) {
    this.profileService.updateUserDetail(property, newValue).then((result) => {
    let responseData: any;
    responseData = result;
    console.log(responseData);
    this.showToast(responseData.message);
    if (responseData.message.indexOf("updated") != -1) {
      console.log("45678965454")
      this.updateDisplayedProperty(newValue, property);
      //需要补充更新localstorage
    }
    //localStorage.setItem('userData', JSON.stringify(responseData));

    }, (err) => {
      this.showToast('No connect to the server');
    }); 
  }



  updateDisplayedProperty(newValue: string, property: string) {
    if (property.indexOf("email") != -1) {
      this.email = newValue;
    }
    else this.department = newValue;
  }
 
  public showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3300
    });
    toast.present();
  }
}
