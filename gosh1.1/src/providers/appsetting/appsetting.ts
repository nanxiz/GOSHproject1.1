import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const CONFIG = {
  apiURL: 'https://goshugeducation.azurewebsites.net'
  //apiURL: 'http://localhost:10255/'
};


@Injectable()
export class AppsettingProvider {

  constructor() {}

  public getApiURL() {
    return CONFIG.apiURL;
  }
}
