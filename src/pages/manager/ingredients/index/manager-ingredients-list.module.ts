import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerIngredientsListPage } from './manager-ingredients-list';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
    declarations: [
        ManagerIngredientsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerIngredientsListPage),
        ComponentsModule
    ],
})
export class IngredientsListPageModule {
}
