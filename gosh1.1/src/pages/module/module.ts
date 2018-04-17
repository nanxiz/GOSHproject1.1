import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModuleserviceProvider } from '../../providers/moduleservice/moduleservice';
import { HttpClient } from '@angular/common/http';
import { AppsettingProvider } from '../../providers/appsetting/appsetting';
import { ModuledetailPage } from '../moduledetail/moduledetail';
import { QuizPage } from '../quiz/quiz';



@IonicPage()
@Component({
  selector: 'page-module',
  templateUrl: 'module.html',
})
export class ModulePage {
  apiURL = this.appsetting.getApiURL() + 'products/';
  modules: any;
  products: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public moduleservise: ModuleserviceProvider,
    public http: HttpClient,
    public appsetting: AppsettingProvider
  ) {
   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModulePage');

    //put this shit in provider
    this.moduleservise.loadmodules().then((result) => {
      this.modules = result;
      localStorage.setItem('modules', JSON.stringify(this.modules));
    }, (err) => {     
    });
    //for unknown reason modules' value couldn't be passed so code below is given.
    this.modules = JSON.parse(localStorage.getItem('modules'));
    this.products = this.modules.products;
    console.log(this.modules);
    console.log(this.products);
  }

  gotoModuleDetail(product) {
    this.navCtrl.push(ModuledetailPage, {
      moduleDetail: product
    });
  }

  gotoQuiz(questions) {
    this.navCtrl.push(QuizPage, {
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
