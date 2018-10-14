import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerLevelsFormPage } from './manager-levels-form';
import { SelectSearchableModule } from "ionic-select-searchable";

@NgModule({
    declarations: [
        ManagerLevelsFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerLevelsFormPage),
        SelectSearchableModule
    ],
})
export class ManagerLevelsFormPageModule {
}
