import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerBillsDetailPage } from './manager-bills-detail';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
    declarations: [
        ManagerBillsDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerBillsDetailPage),
        ComponentsModule
    ],
})
export class ManagerBillsDetailPageModule {
}
