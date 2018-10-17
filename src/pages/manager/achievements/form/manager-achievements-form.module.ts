import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerAchievementsFormPage } from './manager-achievements-form';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
    declarations: [
        ManagerAchievementsFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerAchievementsFormPage),
        SelectSearchableModule
    ],
})
export class ManagerAchievementsFormPageModule {
}
