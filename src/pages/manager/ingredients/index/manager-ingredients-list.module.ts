import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerIngredientsListPage } from './manager-ingredients-list';

@NgModule({
    declarations: [
        ManagerIngredientsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerIngredientsListPage),
    ],
})
export class IngredientsListPageModule {
}
