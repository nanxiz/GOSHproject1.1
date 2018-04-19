import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  public questions: any;
  public Optionstodisplay: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public quizUserService: UserserviceProvider,

  ) {
    this.questions = this.navParams.get("questions");
    this.name=this.navParams.get('moduleName');
    this.questions = JSON.parse( JSON.stringify(this.questions));
    console.log("hhh", this.questions);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
    this.slides.lockSwipes(true);
    //this.Optionstodisplay = this.RomdomizeOptionsOrder(this.questions.options);
    //ADD JSON PARSE TO ABOVE IF NEED

  }

  updateTotalPoints(){
      let pointToAdd:number;
      if (this.newValue == 100){
          pointToAdd = 10;
      }else if (this.newValue>=90){
          pointToAdd = 8;
      }else if(this.newValue>=50){
        pointToAdd = 5;
      }else {
        pointToAdd = 1;
      }

      let previousPoint = this.profile.user.points;
      let newpoints=(previousPoint + pointToAdd).toString();
      this.profile.user.points=newpoints;

      this.quizUserService.updateUserDetail("points",newpoints).then((result) => {
        let responseData: any;
        responseData = result;
        console.log(responseData);
        //this.showToast(responseData.message);
        if (responseData.message.indexOf("updated") != -1) {
          console.log("updated");
          localStorage.setItem('userData', JSON.stringify(this.profile));

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

  selectAnswers(answer,question) {
    this.answered = true;
    answer.selected = true;
    this.count++;
    if (answer.correct) {
      this.score++;
    }
    setTimeout(() => {
      this.answered = false;
      this.nextSlide();
      answer.selected = false;
    }, 300);
  }

  restartquiz() {
    this.updateScore();


    this.setZero();

    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
  }


  gotoLeaderboard() {
    this.updateScore();
    this.navCtrl.push(LearntabsPage,{tabIndex: 3});
    this.setZero();

   // this.slides.lockSwipes(true);
    //updatescore
  }

  gotoModulePage() {
    this.updateScore();
    this.navCtrl.push(LearntabsPage);
    this.setZero();
    //this.slides.lockSwipes(true);
    //updatescore
  }
  setZero(){
    this.score = 0;
    this.count = 0;
    this.newValue=0;
  }
  updateScore() {

    console.log(this.score);
   //change the property below later when module and quiz name could match
    let property = this.name;
    //put find object by key here

    this.profile = JSON.parse(localStorage.getItem('profile'));
    
    this.newValue = (this.score / this.count * 100).toPrecision(2);
    //put find object by key here

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
