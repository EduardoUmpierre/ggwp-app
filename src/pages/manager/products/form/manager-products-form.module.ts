import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerProductsFormPage } from './manager-products-form';
import { BrMaskerModule } from "brmasker-ionic-3";
import { SelectSearchableModule } from "ionic-select-searchable";

@NgModule({
    declarations: [
        ManagerProductsFormPage,
    ],
    imports: [
        BrMaskerModule,
        IonicPageModule.forChild(ManagerProductsFormPage),
        SelectSearchableModule
    ],
})
export class ManagerProductsFormPageModule {
}
