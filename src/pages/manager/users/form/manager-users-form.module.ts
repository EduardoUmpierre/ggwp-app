import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerUsersFormPage } from './manager-users-form';
import { BrMaskerModule } from "brmasker-ionic-3";

@NgModule({
    declarations: [
        ManagerUsersFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerUsersFormPage),
        BrMaskerModule
    ],
})
export class ManagerUsersFormPageModule {
}
