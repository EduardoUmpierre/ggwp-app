import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableHeaderComponent } from "./expandable-header/expandable-header";
import { UserLevelComponent } from './user-level/user-level';
import { IonicModule } from "ionic-angular";
import { LoaderComponent } from './loader/loader';
import { ManagerProductListComponent } from './manager-product-list/manager-product-list';

@NgModule({
    declarations: [
        ExpandableHeaderComponent,
        UserLevelComponent,
        LoaderComponent,
        ManagerProductListComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ExpandableHeaderComponent,
        UserLevelComponent,
        LoaderComponent,
        ManagerProductListComponent
    ]
})
export class ComponentsModule {
}
