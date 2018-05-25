import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngredientsDetailPage } from './ingredients-detail';

@NgModule({
  declarations: [
    IngredientsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(IngredientsDetailPage),
  ],
})
export class IngredientsDetailPageModule {}
