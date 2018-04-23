import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LearntabsPage } from './learntabs';

@NgModule({
  declarations: [
    LearntabsPage,
  ],
  imports: [
    IonicPageModule.forChild(LearntabsPage),
  ]
})
export class LearntabsPageModule {}
