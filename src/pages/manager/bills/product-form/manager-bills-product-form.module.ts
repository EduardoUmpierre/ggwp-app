import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerBillsProductFormPage } from './manager-bills-product-form';

@NgModule({
    declarations: [
        ManagerBillsProductFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerBillsProductFormPage),
    ],
})
export class ManagerBillsProductFormPageModule {
}
