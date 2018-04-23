import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaldetailPage } from './caldetail';

@NgModule({
  declarations: [
    CaldetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CaldetailPage),
  ],
})
export class CaldetailPageModule {}
