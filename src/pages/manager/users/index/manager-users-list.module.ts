import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerUsersListPage } from './manager-users-list';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
    declarations: [
        ManagerUsersListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerUsersListPage),
        ComponentsModule
    ],
})
export class ManagerUsersListPageModule {
}
