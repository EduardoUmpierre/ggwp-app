import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerScheduleFormPage } from './manager-schedule-form';

@NgModule({
  declarations: [
    ManagerScheduleFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerScheduleFormPage),
  ],
})
export class ManagerScheduleFormPageModule {}
