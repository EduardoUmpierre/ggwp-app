import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ManagerBillsFormPage} from './manager-bills-form';
import {BrMaskerModule} from "brmasker-ionic-3";
import {SelectSearchableModule} from "ionic-select-searchable";

@NgModule({
    declarations: [
        ManagerBillsFormPage,
    ],
    imports: [
        BrMaskerModule,
        SelectSearchableModule,
        IonicPageModule.forChild(ManagerBillsFormPage),
    ],
})
export class ManagerBillsFormPageModule {
}
