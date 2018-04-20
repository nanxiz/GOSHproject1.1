import { HttpClient, HttpParams } from '@angular/common/http';

  
import { Injectable } from '@angular/core';
import { AppsettingProvider } from '../appsetting/appsetting';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { RequestOptions, RequestMethod } from '@angular/http';



@Injectable()
export class UserserviceProvider {
  headers: Headers;
  apiURL = this.appsetting.getApiURL() + 'users/';


  userID = "5ace23ceb45c575b89f167c8"; 



  constructor(public http: HttpClient, public appsetting: AppsettingProvider) {
    
  }

  public changeUserID(newid: string) {
    this.userID = newid;
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

  public postToLogin(username, password) { //change

    return this.http.post(this.apiURL + 'login', { 'name': username, 'password': password })
      .subscribe(response => console.log(response));
  }



  
  public postToRegister(userData) {
    return new Promise((resolve, reject) => {
      //let hheaders = new Headers();
      this.http.post(this.apiURL + 'signup', userData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  

  public getUserModules() {
    return this.http.get(this.apiURL + 'signup', {})
      .subscribe(response => console.log(response));
  }

}
