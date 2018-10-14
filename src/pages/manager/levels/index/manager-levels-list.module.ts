import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerLevelsListPage } from './manager-levels-list';

@NgModule({
    declarations: [
        ManagerLevelsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerLevelsListPage),
    ],
})
export class ManagerLevelsListPageModule {
}
