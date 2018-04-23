import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { UserserviceProvider } from '../../providers/userservice/userservice';


@IonicPage()
@Component({
  selector: 'page-calender',
  templateUrl: 'calender.html',
})
export class CalenderPage {
  //calendars=[];
  products:any;
  prodo=[];
  events:any;
  timeline:any;
  // pet:"puppies";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userservice: UserserviceProvider

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
    this.userservice.loadevents().then((result) => {
      this.events = result;
      localStorage.setItem('events', JSON.stringify(this.events));
      console.log(this.events);
    }, (err) => {     
      this.userservice.showToast('Unable to update modules. No connect to the server');
    });
   

    this.events = JSON.parse(localStorage.getItem('events'));
    this.products = this.events.products;
    console.log(this.events);
    console.log(this.products);
    let count = this.events.count;



  }



  //addEvent(calendar){
  //  let date=new Date();
  //  let options ={calendaRId:calendar.id,calendarName:calendar.name,firstRemindermin:15}
  //  this.calendar.createEventInteractivelyWithOptions('My new event','London','some special notes',date,date,options).then(data=>{
  //  });
  
  
 // }
  //openCal(calendar){
   //   this.navCtrl.push(CaldetailPage,{name: calendar.name})
  //}
  

  

}
