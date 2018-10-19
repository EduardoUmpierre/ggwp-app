import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerLevelsListPage } from './manager-levels-list';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
    declarations: [
        ManagerLevelsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerLevelsListPage),
        ComponentsModule
    ],
})
export class ManagerLevelsListPageModule {
}
