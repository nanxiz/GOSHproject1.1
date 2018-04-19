import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
//import { Calendar } from '@ionic-native/calendar';

/**
 * Generated class for the CaldetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-caldetail',
  templateUrl: 'caldetail.html',
})
export class CaldetailPage {
  //calName='';
  //events=[];
  constructor(    //private calendar:Calendar,    private pltform:Platform,
    public navCtrl: NavController, public navParams: NavParams) {
   //     if (this.pltform.is('ios')){
   //         this.calendar.findAllEventsInNamedCalendar(this.calName).then(data=>{
   //           this.events=data;
    //        });
    //    }
      //  else  if (this.pltform.is('ios')){
     //       let start = new Date();
     //       let end = new Date();
     //       end.setDate(end.getDate()+31);

    //        this.calendar.listEventsInRange(start,end).then(data=>{
    //          this.events=data;
    //        });
   // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaldetailPage');
  }

}
