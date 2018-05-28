import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerProductsFormPage } from './manager-products-form';

@NgModule({
    declarations: [
        ManagerProductsFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerProductsFormPage),
    ],
})
export class ManagerProductsFormPageModule {
}
