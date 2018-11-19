import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerDashboardPage } from './manager-dashboard';
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
    declarations: [
        ManagerDashboardPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerDashboardPage),
        ComponentsModule
    ],
})
export class ManagerDashboardPageModule {
}
