import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { Calendar } from '@ionic-native/calendar';
//import{CaldetailPage}from'../caldetail/caldetail'
/**
 * Generated class for the CalenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calender',
  templateUrl: 'calender.html',
})
export class CalenderPage {
  //calendars=[];
  // pet:"puppies";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  //  private calendar:Calendar,
  //  private pltform:Platform
  ) {
   // this.pltform.ready().then(()=>{
   //   this.calendar.listCalendars().then(data=>{
   //     this.calendar=data;
    //  });
   // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalenderPage');
  }

  addEvent(calendar){
  //  let date=new Date();
  //  let options ={calendaRId:calendar.id,calendarName:calendar.name,firstRemindermin:15}
  //  this.calendar.createEventInteractivelyWithOptions('My new event','London','some special notes',date,date,options).then(data=>{
  //  });
  
  
  }
  openCal(calendar){
   //   this.navCtrl.push(CaldetailPage,{name: calendar.name})
  }


  

}
