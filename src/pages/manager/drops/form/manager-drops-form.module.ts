import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerDropsFormPage } from './manager-drops-form';

@NgModule({
  declarations: [
    ManagerDropsFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerDropsFormPage),
  ],
})
export class ManagerDropsFormPageModule {}
