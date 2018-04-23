import { HttpClient, HttpParams } from '@angular/common/http';
import {ToastController} from 'ionic-angular';

  
import { Injectable } from '@angular/core';
import { AppsettingProvider } from '../appsetting/appsetting';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { RequestOptions, RequestMethod } from '@angular/http';



@Injectable()
export class UserserviceProvider {
  headers: Headers;
  apiURL = this.appsetting.getApiURL() + 'users/';


  userID = "5adbaef05a9468354e986a66"; 



  constructor(
    public http: HttpClient, 
    public appsetting: AppsettingProvider,
    private toastCtrl: ToastController,
  ) {
    
  }
  public loadevents(){  
    return new Promise((resolve, reject) => {
      //let hheaders = new Headers();
      this.http.get(this.appsetting.getApiURL() + 'events/')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public changeUserID(newid: string) {
    this.userID = newid;
  }
  public loadleaders(quizname){
    return new Promise((resolve, reject) => {
      //let hheaders = new Headers();
      this.http.get(this.apiURL + 'leaders/'+quizname)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public getAllUserDetail() {
    return new Promise((resolve, reject) => {
      //let hheaders = new Headers();
      this.http.get(this.apiURL + 'leaders/total')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getUserdetail() {
    return new Promise((resolve, reject) => {
      //let hheaders = new Headers();
      this.http.get(this.apiURL + this.userID)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public updateUserDetail(property: string, value: string) {
    let info = [{ 'propName': property, 'value': value }];
    return new Promise((resolve, reject) => {
      //let hheaders = new Headers();
      this.http.patch(this.apiURL + this.userID, info)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });


  }

  public postToLogin(userData) { //change

     return new Promise((resolve, reject) => {
      //let hheaders = new Headers();
      this.http.post(this.apiURL + 'login', userData,{
        headers: { 'Content-Type': 'application/json' }
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  
  public postToRegister(userData) {
    return new Promise((resolve, reject) => {

      this.http.post(this.apiURL + 'signup', userData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  public getUserModules() {
    return this.http.get(this.apiURL + 'signup')
      .subscribe(response => console.log(response));
  }

  public getDepartments(){

    return new Promise((resolve, reject) => {
      //let hheaders = new Headers();
      this.http.get(this.apiURL + 'all/departments')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 900
    });
    toast.present();
  }
  


}
