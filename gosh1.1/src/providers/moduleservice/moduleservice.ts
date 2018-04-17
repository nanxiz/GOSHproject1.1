import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppsettingProvider } from '../appsetting/appsetting';
import 'rxjs/add/operator/map';



@Injectable()
export class ModuleserviceProvider {
  apiURL = this.appsetting.getApiURL() + 'products/';
  //public result;
  constructor(public http: HttpClient, public appsetting: AppsettingProvider) {
    
  }
  public loadmodules() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}