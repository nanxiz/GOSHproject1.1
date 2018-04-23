import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModuleserviceProvider } from '../../providers/moduleservice/moduleservice';
import { HttpClient } from '@angular/common/http';
import { AppsettingProvider } from '../../providers/appsetting/appsetting';
import { ModuledetailPage } from '../moduledetail/moduledetail';
import { QuizPage } from '../quiz/quiz';
import { UserserviceProvider } from '../../providers/userservice/userservice';
//text-lowercase

@IonicPage()
@Component({
  selector: 'page-module',
  templateUrl: 'module.html',
})
export class ModulePage {
  //apiURL = this.appsetting.getApiURL() + 'products/';
  modules: any;
  departmentModule:any;
  products: any;
  name:any;
  level:any;
  department='';
  dptModuleProduct:any;
<<<<<<< HEAD
  moduleType;
=======
  moduleType:"myModule";
>>>>>>> 22f00190514ff872f6c1f6ac4cbf49ee7330a439

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public moduleservise: ModuleserviceProvider,
    public http: HttpClient,
    public appsetting: AppsettingProvider,
    public userservice: UserserviceProvider
  ) {
   
    this.moduleType="myModule";
  }

  ionViewDidLoad() {
    

    console.log('ionViewDidLoad ModulePage');

    this.moduleservise.loadmodules().then((result) => {
      this.modules = result;
      localStorage.setItem('modules', JSON.stringify(this.modules));
      console.log(this.modules);
    }, (err) => {     
      this.userservice.showToast('Unable to update modules. No connect to the server');
    });


    this.modules = JSON.parse(localStorage.getItem('modules'));
    this.products = this.modules.products;
    
    this.getUserInfo();
    this.getUserDepartmentModule();
    

    console.log(this.modules);
   // console.log(this.userInfo);
  }

  getUserDepartmentModule(){
<<<<<<< HEAD
    let departmentData:any;
    departmentData={
      "department":this.department
      
    };
    this.moduleservise.postToGetPersonalizedModule(departmentData).then((result) => {
=======
    this.moduleservise.postToGetPersonalizedModule(this.department).then((result) => {
>>>>>>> 22f00190514ff872f6c1f6ac4cbf49ee7330a439
      this.departmentModule = result;
      localStorage.setItem('departmentModules', JSON.stringify(this.departmentModule));
      console.log(result);
    }, (err) => {     
<<<<<<< HEAD
    
=======
      //TOGGLE THINGI HERE

>>>>>>> 22f00190514ff872f6c1f6ac4cbf49ee7330a439
    });
    this.departmentModule = JSON.parse(localStorage.getItem('departmentModules'));
    this.dptModuleProduct=this.departmentModule.product;
    console.log('all',this.dptModuleProduct);
    console.log('all',this.departmentModule);
  }
  getUserInfo() {
    this.userservice.getUserdetail().then((result) => {
      let profile = result;
      console.log(profile);

      
      localStorage.setItem('profile', JSON.stringify(profile));

    }, (err) => {
      
      });
    let userInfo = JSON.parse(localStorage.getItem('profile'));

    this.name = userInfo.user.name;
<<<<<<< HEAD
    this.department=''+(userInfo.user.department);
=======
    this.department=userInfo.user.department;



    this.department = 'haise';
//////////////////////
    //delete later;
    //console.log({jijiji:this.department});
>>>>>>> 22f00190514ff872f6c1f6ac4cbf49ee7330a439
    this.level=userInfo.user.level;
  }

  gotoModuleDetail(product) {
    this.navCtrl.push(ModuledetailPage, {
      moduleDetail: product
    });
  }

  gotoQuiz(name,questions,serial) {
    this.navCtrl.push(QuizPage, {
      moduleName:name,
      questions: questions,
      moduleSerial:serial
    })
  }

  toggleModuleDetail(i) {
    this.products[i].open = !this.products[i].open;
  }

  toggleModuleDetailD(i){
    this.dptModuleProduct[i].open=!this.dptModuleProduct[i].open;
  }

}

