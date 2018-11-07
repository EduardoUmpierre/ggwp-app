import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicPage } from './music';
import { ComponentsModule } from "../../../components/components.module";
import { SelectSearchableModule } from "ionic-select-searchable";

@NgModule({
    declarations: [
        MusicPage,
    ],
    imports: [
        IonicPageModule.forChild(MusicPage),
        ComponentsModule,
        SelectSearchableModule
    ],
})
export class MusicPageModule {
}
