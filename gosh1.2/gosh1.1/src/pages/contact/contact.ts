import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppsettingProvider } from '../../providers/appsetting/appsetting';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  contacts: any;
  apiURL = this.appsetting.getApiURL() + 'contacts/';
  people: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appsetting: AppsettingProvider,
    public http: HttpClient,

  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
    this.loadContacts();
    this.contacts = JSON.parse(localStorage.getItem('contacts'));
    this.people = this.contacts.contacts;
    console.log(this.contacts);
  }


  loadContacts() {
    //modules = this.moduleservise.getmodule();
    return new Promise((resolve, reject) => {
      //let hheaders = new Headers();
      this.http.get(this.apiURL)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }).then((result) => {
      this.contacts = result;
      //let toast = this.toastCtrl.create(this.responseData);
      //toast.present();
      //this.showToast(this.responseData.message);
      localStorage.setItem('contacts', JSON.stringify(this.contacts));
      //this.navCtrl.push(LoginPage);
      console.log(this.contacts);

    }, (err) => {
      //this.showToast('email is invalid or has been registered before');
      //allert("Failed loading modules");
    });
  }
}
