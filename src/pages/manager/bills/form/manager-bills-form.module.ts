import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerBillsFormPage } from './manager-bills-form';

@NgModule({
    declarations: [
        ManagerBillsFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerBillsFormPage),
    ],
})
export class ManagerBillsFormPageModule {
}
