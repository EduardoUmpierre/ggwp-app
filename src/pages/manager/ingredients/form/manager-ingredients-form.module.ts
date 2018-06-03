import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerIngredientsFormPage } from './manager-ingredients-form';

@NgModule({
    declarations: [
        ManagerIngredientsFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerIngredientsFormPage),
    ],
})
export class ManagerIngredientsFormPageModule {
}
