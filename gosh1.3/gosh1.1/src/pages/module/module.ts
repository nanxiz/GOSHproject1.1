import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModuleserviceProvider } from '../../providers/moduleservice/moduleservice';
import { HttpClient } from '@angular/common/http';
import { AppsettingProvider } from '../../providers/appsetting/appsetting';
import { ModuledetailPage } from '../moduledetail/moduledetail';
import { QuizPage } from '../quiz/quiz';
import { UserserviceProvider } from '../../providers/userservice/userservice';


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
  moduleType:"myModule";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public moduleservise: ModuleserviceProvider,
    public http: HttpClient,
    public appsetting: AppsettingProvider,
    public userservice: UserserviceProvider
  ) {
   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModulePage');

    //put this shit in provider
    this.moduleservise.loadmodules().then((result) => {
      this.modules = result;
      localStorage.setItem('modules', JSON.stringify(this.modules));
      console.log(this.modules);
    }, (err) => {     
    });
    //for unknown reason modules' value couldn't be passed so code below is given.
    this.modules = JSON.parse(localStorage.getItem('modules'));
    this.products = this.modules.products;
    
   // this.userInfo = JSON.parse(localStorage.getItem('profile'));
    this.getUserInfo();
    this.getUserDepartmentModule();
    

    console.log(this.modules);
   // console.log(this.userInfo);
  }

  getUserDepartmentModule(){
    this.moduleservise.postToGetPersonalizedModule(this.department).then((result) => {
      this.departmentModule = result;
      localStorage.setItem('departmentModules', JSON.stringify(this.departmentModule));
      console.log(result);
    }, (err) => {     
      //TOGGLE THINGI HERE

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
    this.department=userInfo.user.department;



    this.department = 'haise';
//////////////////////
    //delete later;
    //console.log({jijiji:this.department});
    this.level=userInfo.user.level;
  }

  gotoModuleDetail(product) {
    this.navCtrl.push(ModuledetailPage, {
      moduleDetail: product
    });
  }

  gotoQuiz(name,questions) {
    this.navCtrl.push(QuizPage, {
      moduleName:name,
      questions: questions
    })
  }


  toggleSection(i) {
    this.products[i].open = !this.products[i].open;
  }

 // toggleItem(i, j) {
   // this.products[i].children[j].open = !this.products[i].children[j].open;

//  }

}
//*ngFor="let module of modules.products"
//<ion-card-content>{{module.products.name}}</ion-card-content>
