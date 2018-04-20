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
    private profileService: UserserviceProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUserInfo();
    //this.userInfo = this.userInfo.user;
    console.log(this.userInfo);
    this.name = this.userInfo.user.name;
    this.points = this.userInfo.user.points;
    this.department = this.userInfo.user.department;
    this.email = this.userInfo.user.email;
    this.level = this.userInfo.user.level;
    this.updated = false;


  }

  getUserInfo() {

    this.userInfo = JSON.parse(localStorage.getItem('profile'));
  }

  alertUpdateUsername(){
    let username = '';
    const editAlert = this.alertCtrl.create({
      title: "Enter new username",
      inputs: [{
        name: "username",
        type: "text"
      }],
      buttons: [{
        text: "ADD",
        handler: data => {
          if (data.username.trim().length>=1) {
            console.log(data.username);
            this.updateProperty(data.username, "name");
         
          } else {
            alert("username can not be empty");
          }
        }
      }]
    });
    editAlert.present();
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
            alert("department can not be empty");
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
      this.updateDisplayedPropertyAndLocalstore(newValue, property);
      //需要补充更新localstorage 在userservice中或许新建函数
      //this.userInfo.
    }
    //localStorage.setItem('userData', JSON.stringify(responseData));

    }, (err) => {
      this.showToast('No connect to the server');
    }); 
  }



  updateDisplayedPropertyAndLocalstore(newValue: string, property: string) {
    if (property.indexOf("email") != -1) {
      this.email = newValue;
      this.userInfo.user.email=newValue;

    }
    else if (property.indexOf("department")) {  
      this.department = newValue;
      this.userInfo.user.department=newValue;

    }else{
      this.name = newValue;
      this.userInfo.user.name=newValue;
    }

    localStorage.setItem('profile', JSON.stringify(this.userInfo));

  }
 
  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3300
    });
    toast.present();
  }
}
