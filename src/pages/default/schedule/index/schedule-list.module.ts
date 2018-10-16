import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulePage } from './schedule-list';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
    declarations: [
        SchedulePage,
    ],
    imports: [
        IonicPageModule.forChild(SchedulePage),
        ComponentsModule
    ],
})
export class SchedulePageModule {
}
