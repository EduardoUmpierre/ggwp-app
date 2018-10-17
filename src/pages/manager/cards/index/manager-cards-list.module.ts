import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerCardsListPage } from './manager-cards-list';

@NgModule({
    declarations: [
        ManagerCardsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerCardsListPage),
    ],
})
export class ManagerCardsListPageModule {
}
