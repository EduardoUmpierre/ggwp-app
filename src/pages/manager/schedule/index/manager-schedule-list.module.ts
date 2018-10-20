import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerScheduleListPage } from './manager-schedule-list';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
    declarations: [
        ManagerScheduleListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerScheduleListPage),
        ComponentsModule
    ],
})
export class ManagerScheduleListPageModule {
}
