import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const CONFIG = {
  //apiURL: 'http://localhost:10255/'
  apiURL: 'http://127.0.0.1:10255/'
};    
  

@Injectable()
export class AppsettingProvider {

  constructor() {}

  public getApiURL() {
    return CONFIG.apiURL;
  }
}
