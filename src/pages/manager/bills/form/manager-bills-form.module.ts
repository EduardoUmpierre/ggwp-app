import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerBillsFormPage } from './manager-bills-form';
import { SelectSearchableModule } from "ionic-select-searchable";

@NgModule({
    declarations: [
        ManagerBillsFormPage,
    ],
    imports: [
        SelectSearchableModule,
        IonicPageModule.forChild(ManagerBillsFormPage),
    ],
})
export class ManagerBillsFormPageModule {
}
