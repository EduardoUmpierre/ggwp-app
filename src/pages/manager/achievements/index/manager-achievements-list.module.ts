import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerAchievementsListPage } from './manager-achievements-list';

@NgModule({
    declarations: [
        ManagerAchievementsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerAchievementsListPage),
    ],
})
export class ManagerAchievementsListPageModule {
}
