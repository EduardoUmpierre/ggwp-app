import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';
import { ExpandableHeaderComponent } from "../../../../components/expandable-header/expandable-header";

@NgModule({
    declarations: [
        ProductsPage,
        ExpandableHeaderComponent
    ],
    imports: [
        IonicPageModule.forChild(ProductsPage),
    ],
})
export class ProductsPageModule {
}
