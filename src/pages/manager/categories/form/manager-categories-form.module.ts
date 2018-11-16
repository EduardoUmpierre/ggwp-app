import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerCategoriesFormPage } from './manager-categories-form';

@NgModule({
    declarations: [
        ManagerCategoriesFormPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerCategoriesFormPage),
    ],
})
export class ManagerCategoriesFormPageModule {
}
