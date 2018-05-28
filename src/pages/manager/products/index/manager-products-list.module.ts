import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerProductsListPage } from './manager-products-list';

@NgModule({
    declarations: [
        ManagerProductsListPage,
    ],
    imports: [
        IonicPageModule.forChild(ManagerProductsListPage),
    ],
})
export class ManagerProductsListPageModule {
}
