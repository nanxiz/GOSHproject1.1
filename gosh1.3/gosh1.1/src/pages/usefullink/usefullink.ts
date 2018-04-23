import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ThemeableBrowser,ThemeableBrowserOptions, ThemeableBrowserObject} from '@ionic-native/themeable-browser';

/**
 * Generated class for the UsefullinkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usefullink',
  templateUrl: 'usefullink.html',
})
export class UsefullinkPage {
  gosh='https://www.gosh.nhs.uk/';
  goshGold='https://www.goshgold.org/';
  lsp='http://www.londonpaediatrics.co.uk/';
  rpcch='https://www.rcpch.ac.uk/';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private themebrowser:ThemeableBrowser
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsefullinkPage');
  }


  openBrowser(site){
    const options={
      toolbar: {
        height: 44,
        color: '#3573bbff'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true,
        staticText: 'Academy Browser'
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },

    };
    const browser: ThemeableBrowserObject = this.themebrowser.create(site,'_blank',options);
  }
}
