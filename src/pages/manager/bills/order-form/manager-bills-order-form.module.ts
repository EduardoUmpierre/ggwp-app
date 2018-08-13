import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerBillsOrderFormPage } from './manager-bills-order-form';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
    declarations: [
        ManagerBillsOrderFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerBillsOrderFormPage),
        ComponentsModule
    ],
})
export class ManagerBillsOrderFormPageModule {
}
