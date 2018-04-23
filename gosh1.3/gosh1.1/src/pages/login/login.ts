import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { UserserviceProvider } from '../../providers/userservice/userservice';
   
<<<<<<< HEAD

=======
>>>>>>> 22f00190514ff872f6c1f6ac4cbf49ee7330a439


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
<<<<<<< HEAD
    let userLogin = {
=======
    let userData = {
>>>>>>> 22f00190514ff872f6c1f6ac4cbf49ee7330a439
      "name": this.name,
      
      "password": this.password
    };

<<<<<<< HEAD
    console.log(userLogin);
    
    this.loginService.postToLogin(userLogin).then((result) => {
      console.log(result);
=======
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
>>>>>>> 22f00190514ff872f6c1f6ac4cbf49ee7330a439

      let responseData:any;
      responseData = result;
      console.log(responseData);
      this.loginService.showToast(responseData.message);
      localStorage.setItem('userLogin',JSON.stringify(userLogin));
      localStorage.setItem('userID', JSON.stringify(responseData.id));

    console.log(this.userID);
    


    }, (err) => {
      //this.loginService.showToast('No connect to the server');
    });

    this.userID = JSON.parse(localStorage.getItem('userID'));
    if(this.userID!=null){
      //this.userID = this.userID.id;
      this.loginService.changeUserID(this.userID);}
    
    
    //load information for upcoming pages
    this.loginService.getUserdetail().then((result) => {
      let profile = result;
      console.log(profile);

      localStorage.setItem('profile', JSON.stringify(profile));

    }, (err) => {

      });
  
    let passport=JSON.parse(localStorage.getItem('userLogin'));
    if (passport==null){
        passport = {
          "name":"name",
          "password":"password"
        }
        passport=JSON.parse(JSON.stringify(passport));
    } 
    if (this.name === (passport.name) && (this.password === (passport.password))){
    this.navCtrl.setRoot(HomePage);
    
    }
  }
  private showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration:3200
    });
    toast.present();
  }


}
