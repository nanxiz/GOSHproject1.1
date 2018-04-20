import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModuledetailPage } from './moduledetail';

@NgModule({
  declarations: [
    ModuledetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ModuledetailPage),
  ],
})
export class ModuledetailPageModule {}
