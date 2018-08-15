import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerBillsProductOrderFormPage } from './manager-bills-product-order-form';
import { ComponentsModule } from "../../../../components/components.module";
import { SelectSearchableModule } from "ionic-select-searchable";

@NgModule({
    declarations: [
        ManagerBillsProductOrderFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerBillsProductOrderFormPage),
        ComponentsModule,
        SelectSearchableModule
    ],
})
export class ManagerBillsProductOrderFormPageModule {
}
