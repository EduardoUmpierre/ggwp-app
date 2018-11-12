import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacebookRegisterPage } from './facebook-register';
import { BrMaskerModule } from "brmasker-ionic-3";

@NgModule({
    declarations: [
        FacebookRegisterPage,
    ],
    imports: [
        IonicPageModule.forChild(FacebookRegisterPage),
        BrMaskerModule
    ],
})
export class FacebookRegisterPageModule {
}
