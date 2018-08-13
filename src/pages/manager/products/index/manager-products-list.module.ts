import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerProductsListPage } from './manager-products-list';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
    declarations: [
        ManagerProductsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerProductsListPage),
        ComponentsModule
    ],
})
export class ManagerProductsListPageModule {
}
