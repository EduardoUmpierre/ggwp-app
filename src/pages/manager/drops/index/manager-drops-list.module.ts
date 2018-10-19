import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerDropsListPage } from './manager-drops-list';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
    declarations: [
        ManagerDropsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerDropsListPage),
        ComponentsModule
    ],
})
export class ManagerDropsListPageModule {
}
