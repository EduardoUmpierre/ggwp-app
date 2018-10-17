import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerCardsFormPage } from './manager-cards-form';

@NgModule({
    declarations: [
        ManagerCardsFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerCardsFormPage),
    ],
})
export class ManagerCardsFormPageModule {
}
