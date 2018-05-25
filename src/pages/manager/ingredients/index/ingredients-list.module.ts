import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngredientsListPage } from './ingredients-list';

@NgModule({
    declarations: [
        IngredientsListPage,
    ],
    imports: [
        IonicPageModule.forChild(IngredientsListPage),
    ],
})
export class IngredientsListPageModule {
}
