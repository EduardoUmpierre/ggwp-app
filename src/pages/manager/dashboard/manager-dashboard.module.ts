import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerDashboardPage } from './manager-dashboard';

@NgModule({
    declarations: [
        ManagerDashboardPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerDashboardPage),
    ],
})
export class ManagerDashboardPageModule {
}
