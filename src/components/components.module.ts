import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableHeaderComponent } from "./expandable-header/expandable-header";
import { UserLevelComponent } from './user-level/user-level';
import { IonicModule } from "ionic-angular";
import { LoaderComponent } from './loader/loader';

@NgModule({
    declarations: [
        ExpandableHeaderComponent,
        UserLevelComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ExpandableHeaderComponent,
        UserLevelComponent,
        LoaderComponent
    ]
})
export class ComponentsModule {
}
