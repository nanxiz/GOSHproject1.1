import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';


@IonicPage()
@Component({
  selector: 'page-moduledetail',
  templateUrl: 'moduledetail.html',
})
export class ModuledetailPage {
  public moduleDetail;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.moduleDetail = this.navParams.get("moduleDetail");
    console.log("hey", this.moduleDetail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModuledetailPage');
  }
  gotoQuzzPage(questions) {
    this.navCtrl.push(QuizPage, {
      questions: questions
      
    })
  }
}
