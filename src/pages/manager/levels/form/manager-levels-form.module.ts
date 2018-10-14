import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerLevelsFormPage } from './manager-levels-form';

@NgModule({
  declarations: [
    ManagerLevelsFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerLevelsFormPage),
  ],
})
export class ManagerLevelsFormPageModule {}
