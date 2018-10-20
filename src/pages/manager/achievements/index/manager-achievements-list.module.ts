import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerAchievementsListPage } from './manager-achievements-list';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
    declarations: [
        ManagerAchievementsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerAchievementsListPage),
        ComponentsModule
    ],
})
export class ManagerAchievementsListPageModule {
}
