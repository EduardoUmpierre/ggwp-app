import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerCategoriesListPage } from './manager-categories-list';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
    declarations: [
        ManagerCategoriesListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerCategoriesListPage),
        ComponentsModule
    ],
})
export class ManagerCategoriesListPageModule {
}
