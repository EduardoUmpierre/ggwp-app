import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableHeaderComponent } from "./expandable-header/expandable-header";
import { UserLevelComponent } from './user-level/user-level';

@NgModule({
    declarations: [
        ExpandableHeaderComponent,
        UserLevelComponent
    ],
    imports: [CommonModule],
    exports: [
        ExpandableHeaderComponent,
        UserLevelComponent
    ]
})
export class ComponentsModule {
}
