import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { UserserviceProvider } from '../../providers/userservice/userservice'
//import { LeaderboardPage } from '../leaderboard/leaderboard';
import { ModuleleaderPage } from '../moduleleader/moduleleader';

import { LearntabsPage } from '../learntabs/learntabs';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  @ViewChild('slides') slides: any;
  answered: boolean = false;
  score: number = 0;
  count: number = 0;
  name:any;
  newValue:any;
  slideOptions: any;
  profile:any;
  pointToAdd:number;
  public questions: any;
  public Optionstodisplay: any;
  questionsNumber:number
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private quizUserService: UserserviceProvider,
    private toastCtrl: ToastController,


  ) {
    this.questions = this.navParams.get("questions");
    this.name=this.navParams.get('moduleName');
    this.questions = JSON.parse( JSON.stringify(this.questions));
    this.questionsNumber=this.questions.length;
    console.log("hhh", this.questions);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
    this.slides.lockSwipes(true);
    //this.Optionstodisplay = this.RomdomizeOptionsOrder(this.questions.options);
    //ADD JSON PARSE TO ABOVE IF NEED

  }

  checkSlideLast(i){
      if (i==this.questionsNumber){
      this.newValue = (this.score / this.count * 100).toPrecision(2);
        //put find object by key here
        console.log(this.score);
        if (this.newValue == 100){
          this.pointToAdd = 10;
      }
      if (this.newValue>=80){
          this.pointToAdd = 7;
      }
      if(this.newValue>=50 && (this.newValue<80)){
        this.pointToAdd = 4;
      }
       if(this.newValue>=40 && (this.newValue<50))
      {
        this.pointToAdd = 3;
      }
      if(this.newValue<40){
        this.pointToAdd=1;
      }


      this.updateScore();


    }
  }


  checkUserLevel(points):string{
    let level:string;
    if (points < 10){
      return "noob";
    }else if (points < 25){
      return "noob+";
    }else if(points < 40){
      return  "noob++";
    }else if (points < 65){
      return "noob with his own stuff";
    }else if (points<95){
      return "competetive noob";
    }else if (points < 180){
      return  "pro";
    }else if (points<300){
      return "competitive pro";
    }else{
      return "dynasty";
    }

  }
  updateLevel(level){
      this.quizUserService.updateUserDetail("level",level).then((result) => {
        let respons:any;
        respons = result;
        if (respons.message.indexOf("updated")!=-1){
          this.profile.user.level = level;
          localStorage.setItem('userData', JSON.stringify(this.profile));

        }
      });
  }
  updateTotalPoints(){
      

      let previousPoint = this.profile.user.points;
      let newpoints=(previousPoint + this.pointToAdd).toString();
      this.profile.user.points=newpoints;

      this.quizUserService.updateUserDetail("points",newpoints).then((result) => {
        let responseData: any;
        responseData = result;
        console.log(responseData);
        //this.showToast(responseData.message);
        if (responseData.message.indexOf("updated") != -1) {
          console.log("updated");
          localStorage.setItem('userData', JSON.stringify(this.profile));
          let level = this.checkUserLevel(newpoints);
          if (level.indexOf(this.profile.user.level) == -1){
            this.updateLevel(level);
          }
        }

      }, (err) => {
       // this.showToast('No connect to the server');
      });
    
  


  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  selectAnswers(answer,question,i) {
    this.answered = true;
    answer.selected = true;
    this.count++;
    if (answer.correct) {
      this.score++;
      this.showToast("Correct!");

    }
    else{
      this.showToast("Wrong!");

    }
    this.checkSlideLast(i);

    setTimeout(() => {
      this.answered = false;

      this.nextSlide();
      answer.selected = false;
    }, 500);
  }

  restartquiz() {
    //this.updateScore();


    this.setZero();

    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
  }


  gotoLeaderboard() {
    //this.updateScore();
    this.setZero();

    this.navCtrl.push(LearntabsPage,{tabIndex: 3});

   // this.slides.lockSwipes(true);
    //updatescore
  }

  gotoModulePage() {
    //this.updateScore();
    this.setZero();

    this.navCtrl.push(LearntabsPage);
    //this.slides.lockSwipes(true);
    //updatescore
  }
  setZero(){
    this.score = 0;
    this.count = 0;
    this.newValue=0;
    this.pointToAdd=0;
    this.questionsNumber=0;
  }
  updateScore() {

    console.log(this.newValue);

    console.log(this.score);
   //change the property below later when module and quiz name could match
    let property = this.name;
    //put find object by key here

    this.profile = JSON.parse(localStorage.getItem('profile'));
    
    
    //this.profile.user.
    
    let newValuestring = this.newValue.toString();
    this.quizUserService.updateUserDetail(property, newValuestring).then((result) => {
        let responseData: any;
        responseData = result;
        console.log(responseData);
        //this.showToast(responseData.message);
        if (responseData.message.indexOf("updated") != -1) {
          console.log("updated")
          localStorage.setItem('userData', JSON.stringify(this.profile));
          //check will profile auto show updated local's data
          this.updateTotalPoints();
          
        }
        localStorage.setItem('userData', JSON.stringify(responseData));

      }, (err) => {
       // this.showToast('No connect to the server');
      });
    
  }
  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3300
    });
    toast.present();
  }


  /*
  RomdomizeOptionsOrder(origin:any[]): any[] {
    for (let i = origin.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1));
      let temp = origin[i];
      origin[i] = origin[j];
      origin[j] = temp;
    }
    
    return origin;

    }
  */

}
