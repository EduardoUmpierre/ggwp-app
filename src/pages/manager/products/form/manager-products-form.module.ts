import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerProductsFormPage } from './manager-products-form';
import { BrMaskerModule } from "brmasker-ionic-3";

@NgModule({
    declarations: [
        ManagerProductsFormPage,
    ],
    imports: [
        BrMaskerModule,
        IonicPageModule.forChild(ManagerProductsFormPage),
    ],
})
export class ManagerProductsFormPageModule {
}
