import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerBillsListPage } from './manager-bills-list';

@NgModule({
    declarations: [
        ManagerBillsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerBillsListPage),
    ],
})
export class ManagerBillsListPageModule {
}
