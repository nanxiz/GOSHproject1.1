import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserserviceProvider } from '../../providers/userservice/userservice'
import { WheelSelector } from '@ionic-native/wheel-selector';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  })


export class RegisterPage {
  responseData: any;
  departments:any;
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
    private toastCtrl: ToastController,
    private select: WheelSelector
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.getDptOption();
 
  }

  getDptOption(){
    this.registerService.getDepartments().then((result) => {
      this.departments = result;
      //let toast = this.toastCtrl.create(this.responseData);
      //toast.present();
      console.log(this.departments);
      localStorage.setItem('departments', JSON.stringify(this.departments));

    }, (err) => {
      this.showToast('you are unable to register now.No connect to the server');
    });

    this.departments= JSON.parse(localStorage.getItem('departments'));
    console.log('qunimaded!',this.department);
  }
<<<<<<< HEAD

  /*
=======
>>>>>>> 22f00190514ff872f6c1f6ac4cbf49ee7330a439
  OpenDepartmentPicker(){
      this.select.show({
        title:'Select your department',
        positiveButtonText:'Choose',
        negativeButtonText:'Quit',
        items:[
          this.departments
        ],
        defaultItems:[
          {index:0,value:this.departments[1]}
        ]
      }).then(res=>{
        //let message = 'Selected' $res;
      })
  }

<<<<<<< HEAD
*/
=======

>>>>>>> 22f00190514ff872f6c1f6ac4cbf49ee7330a439
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
