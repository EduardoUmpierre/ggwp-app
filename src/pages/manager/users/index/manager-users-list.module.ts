import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerUsersListPage } from './manager-users-list';

@NgModule({
    declarations: [
        ManagerUsersListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerUsersListPage),
    ],
})
export class ManagerUsersListPageModule {
}
