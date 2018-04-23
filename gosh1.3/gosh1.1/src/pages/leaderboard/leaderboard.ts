import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ModuleserviceProvider } from '../../providers/moduleservice/moduleservice';
import { UserserviceProvider } from '../../providers/userservice/userservice'
import { ModuleserviceProvider } from '../../providers/moduleservice/moduleservice';

/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {
  allPoints:any;
  modules:any;
  products:any;
  count:number;
  user: any;
  quizarray:Array<{}>;
  i:number;
  //pages: Array<{icon:string, color:string,title: string, component: any}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public allUsersPointsService: UserserviceProvider,
    public moduleservise: ModuleserviceProvider,

   // public moduleservise: ModuleserviceProvider,

  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
    this.getAllUsersPoints();
    this.getModules();
    this.allPoints = this.allPoints;
  
   // users = JSON.parse(JSON.stringify(users));

    //this.allPoints = JSON.parse(this.all);
    //this.allPoints.users = JSON.parse(this.allPoints.users);
    //this.allPoints = this.rankPoints(users);
    //console.log(this.allPoints);

  }
  rankPoints(points: any):any {
    points.sort();
    return points.slice(1, 6);

  }
 

  getModules(){
    this.moduleservise.loadmodules().then((result) => {
      this.modules = result;
      localStorage.setItem('modules', JSON.stringify(this.modules));
      //console.log(this.modules);
    }, (err) => {     
      this.allUsersPointsService.showToast('Unable to update. No connect to the server');
    });
  
    this.modules = JSON.parse(localStorage.getItem('modules'));
    this.products = this.modules.products;
    this.count=this.modules.count;


    
    
  
  }



  getAllUsersPoints() {
    let usersPoint: any;
    this.allUsersPointsService.getAllUserDetail().then((result) => {
     // this.allPoints = result;
      result = JSON.parse(JSON.stringify(result));
      let user:any
      user = result;
     // user = JSON.parse(user);

      //this.allPoints.
      user = this.rankPoints(user.users);
      //console.log(user);

      //let toast = this.toastCtrl.create(this.responseData);
      //toast.present();
      //this.showToast(this.responseData.message);
      localStorage.setItem('allPoints', JSON.stringify(user));
      //this.navCtrl.push(LoginPage);

    }, (err) => {
    
      });

    this.allPoints = JSON.parse(localStorage.getItem('allPoints'));
    

  }
/*
  toggleModuleDetail(i) {
    this.products[i].open = !this.products[i].open;
  }


  getquizrank(serial,i){
    this.i=i;
      this.allUsersPointsService.loadleaders(serial).then((result) => {
        this.quizarray[this.i]=result;
        console.log(this.quizarray[i]); 

        result = JSON.parse(JSON.stringify(result));
         let user:any
         user = result;
       
        // user = this.rankPoints(user.users);
         console.log(this.quizarray); 
   
         localStorage.setItem('serial'+i, JSON.stringify(user));
   
       }, (err) => {
       
         });
    }
    //console.log(this.quizarray);

    */
  }



