import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { LearntabsPage } from '../learntabs/learntabs';   


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  constructor(public navCtrl: NavController) {

  }
  gotoModulePage() {
    
    this.navCtrl.setRoot(LearntabsPage); 

  }

  slider = [{
    title:"Welcome to GUE!"

  }];


}
