import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerCardsListPage } from './manager-cards-list';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
    declarations: [
        ManagerCardsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerCardsListPage),
        ComponentsModule
    ],
})
export class ManagerCardsListPageModule {
}
