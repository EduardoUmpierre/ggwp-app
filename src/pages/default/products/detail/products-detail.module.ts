import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsDetailPage } from './products-detail';
import { ComponentsModule } from "../../../../components/components.module";

@NgModule({
    declarations: [
        ProductsDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(ProductsDetailPage),
        ComponentsModule
    ],
})
export class ProductsDetailPageModule {
}
