import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerUsersFormPage } from './manager-users-form';

@NgModule({
    declarations: [
        ManagerUsersFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerUsersFormPage),
    ],
})
export class ManagerUsersFormPageModule {
}
