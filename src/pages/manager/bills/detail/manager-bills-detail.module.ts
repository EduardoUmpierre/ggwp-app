import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerBillsDetailPage } from './manager-bills-detail';

@NgModule({
    declarations: [
        ManagerBillsDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerBillsDetailPage),
    ],
})
export class ManagerBillsDetailPageModule {
}
