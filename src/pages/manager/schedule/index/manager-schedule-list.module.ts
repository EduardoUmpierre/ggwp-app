import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerScheduleListPage } from './manager-schedule-list';

@NgModule({
  declarations: [
    ManagerScheduleListPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerScheduleListPage),
  ],
})
export class ManagerScheduleListPageModule {}
