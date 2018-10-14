import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerDropsListPage } from './manager-drops-list';

@NgModule({
  declarations: [
    ManagerDropsListPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerDropsListPage),
  ],
})
export class ManagerDropsListPageModule {}
